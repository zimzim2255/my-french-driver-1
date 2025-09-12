import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Download,
  Clock,
  MapPin,
  Star,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { bookingService, type Booking } from '../services/api';

export function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        console.log('📊 Loading reports data...');
        // First attempt: paginated with defaults many APIs expect
        let res = await bookingService.getAll({ page: 1, limit: 100 });
        console.log('📊 Reports API Response (page=1, limit=100):', res);
        if (!res.success) {
          // Fallback: plain request without params
          console.warn('⚠️ First attempt failed, retrying without params...');
          res = await bookingService.getAll();
          console.log('📊 Reports API Response (fallback):', res);
        }

        if (res.success && res.data) {
          const data: any = res.data;
          const list: Booking[] = (data?.bookings ?? data?.items ?? (Array.isArray(data) ? data : []));
          setBookings(list);
          console.log('✅ Loaded bookings for reports:', list.length);
        } else {
          setError(res.error || 'Failed to load reports data');
          console.error('❌ Reports API Error:', res.error);
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Failed to load reports data';
        setError(msg);
        console.error('❌ Reports loading error:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Helpers
  const now = useMemo(() => new Date(), []);

  const isInRange = (d: Date, range: '7d' | '30d' | '90d' | '1y') => {
    const ms = {
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000,
      '1y': 365 * 24 * 60 * 60 * 1000,
    }[range];
    return now.getTime() - d.getTime() <= ms;
  };

  const filtered = useMemo(() => {
    return bookings.filter(b => isInRange(new Date(b.created_at), timeRange));
  }, [bookings, timeRange]);

  const previousPeriod = useMemo(() => {
    const ms = {
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000,
      '1y': 365 * 24 * 60 * 60 * 1000,
    }[timeRange];
    const startPrev = new Date(now.getTime() - 2 * ms);
    const endPrev = new Date(now.getTime() - ms);
    return bookings.filter(b => {
      const d = new Date(b.created_at);
      return d >= startPrev && d < endPrev;
    });
  }, [bookings, timeRange, now]);

  // Revenue metrics
  const revenueTotal = useMemo(() => filtered.reduce((sum, b) => sum + (b.total_price || 0), 0), [filtered]);
  const revenuePrev = useMemo(() => previousPeriod.reduce((sum, b) => sum + (b.total_price || 0), 0), [previousPeriod]);
  const growthPct = useMemo(() => {
    if (revenuePrev <= 0) return 0;
    return ((revenueTotal - revenuePrev) / revenuePrev) * 100;
  }, [revenueTotal, revenuePrev]);

  // Revenue by month for last 6 months (overall)
  const revenueMonthly = useMemo(() => {
    const months: { month: string; revenue: number; bookings: number }[] = [];
    const fmt = (d: Date) => d.toLocaleString('en-GB', { month: 'short' });
    for (let i = 5; i >= 0; i--) {
      const ref = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const y = ref.getFullYear();
      const m = ref.getMonth();
      const monthBookings = bookings.filter(b => {
        const bd = new Date(b.created_at);
        return bd.getFullYear() === y && bd.getMonth() === m;
      });
      const rev = monthBookings.reduce((s, b) => s + (b.total_price || 0), 0);
      months.push({ month: fmt(ref), revenue: rev, bookings: monthBookings.length });
    }
    return months;
  }, [bookings, now]);

  const revenueData = useMemo(() => ({
    total: `€${revenueTotal.toFixed(2)}`,
    growth: `${growthPct >= 0 ? '+' : ''}${growthPct.toFixed(1)}%`,
    monthly: revenueMonthly
  }), [revenueTotal, growthPct, revenueMonthly]);

  // Booking stats
  const bookingStats = useMemo(() => {
    const total = filtered.length;
    const canceled = filtered.filter(b => b.booking_status === 'cancelled').length;
    const pending = filtered.filter(b => b.booking_status === 'pending').length;
    const completed = total - canceled; // approximation
    const avg = total > 0 ? revenueTotal / total : 0;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;
    return {
      totalBookings: total,
      completedBookings: completed,
      canceledBookings: canceled,
      pendingBookings: pending,
      averageValue: `€${avg.toFixed(0)}`,
      completionRate: `${completionRate.toFixed(1)}%`
    };
  }, [filtered, revenueTotal]);

  // Top routes from filtered
  const topRoutes = useMemo(() => {
    const map = new Map<string, { bookings: number; revenue: number }>();
    filtered.forEach(b => {
      const key = `${b.pickup_location} ↔ ${b.dropoff_location}`;
      const cur = map.get(key) || { bookings: 0, revenue: 0 };
      cur.bookings += 1;
      cur.revenue += b.total_price || 0;
      map.set(key, cur);
    });
    const totalRevenue = Array.from(map.values()).reduce((s, v) => s + v.revenue, 0) || 1;
    return Array.from(map.entries())
      .map(([route, v]) => ({
        route,
        bookings: v.bookings,
        revenue: `€${v.revenue.toFixed(2)}`,
        percentage: Math.round((v.revenue / totalRevenue) * 100)
      }))
      .sort((a, b) => parseFloat(b.revenue.slice(1)) - parseFloat(a.revenue.slice(1)))
      .slice(0, 5);
  }, [filtered]);

  // Customers (basic metrics inferred from filtered + all-time)
  const customerMetrics = useMemo(() => {
    const byCustomerAll = new Map<string, number>();
    bookings.forEach(b => byCustomerAll.set(b.customer_name, (byCustomerAll.get(b.customer_name) || 0) + 1));

    const byCustomerFiltered = new Set(filtered.map(b => b.customer_name));
    const newCustomers = Array.from(byCustomerFiltered).filter(name => (byCustomerAll.get(name) || 0) === 1).length;
    const returning = Array.from(byCustomerFiltered).filter(name => (byCustomerAll.get(name) || 0) > 1).length;
    const vip = Array.from(byCustomerAll.entries()).filter(([, count]) => count >= 5).length;

    return [
      { type: 'New Customers', value: newCustomers, change: '—', positive: true },
      { type: 'Returning Customers', value: returning, change: '—', positive: true },
      { type: 'VIP Customers', value: vip, change: '—', positive: true },
      { type: 'Active Customers', value: byCustomerFiltered.size, change: '—', positive: true }
    ];
  }, [bookings, filtered]);

  // Driver/fleet placeholders (can be wired when API available)
  const driverPerformance = [
    { 
      name: 'Philippe Martin',
      totalTrips: 67,
      rating: 4.9,
      revenue: '€5,430',
      efficiency: 94
    },
    { 
      name: 'Antoine Moreau',
      totalTrips: 54,
      rating: 4.8,
      revenue: '€4,320',
      efficiency: 91
    },
    { 
      name: 'Julien Leroy',
      totalTrips: 45,
      rating: 4.7,
      revenue: '€3,600',
      efficiency: 88
    },
    { 
      name: 'Claire Dubois',
      totalTrips: 38,
      rating: 4.9,
      revenue: '€3,040',
      efficiency: 92
    }
  ];

  const fleetUtilization = {
    totalVehicles: 8,
    activeVehicles: 6,
    utilizationRate: 78,
    vehicles: [
      { model: 'Mercedes E-Class', trips: 42, hours: 156, efficiency: 89 },
      { model: 'BMW 7 Series', trips: 38, hours: 142, efficiency: 85 },
      { model: 'Audi A8', trips: 35, hours: 128, efficiency: 82 },
      { model: 'Tesla Model S', trips: 28, hours: 98, efficiency: 91 }
    ]
  };

  // Export a styled Excel-compatible .xls (HTML) with wide columns, spacing, and colored headers
  const handleExport = () => {
    const companyName = 'My French Driver';

    const labelForRange = (r: typeof timeRange) => (
      r === '7d' ? 'Last 7 days' : r === '30d' ? 'Last 30 days' : r === '90d' ? 'Last 90 days' : 'Last year'
    );

    const escHtml = (val: any) => {
      const s = (val ?? '').toString();
      return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    };

    const titleCase = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

    const columns = [
      { key: 'ref', title: 'Booking Ref', width: 160 },
      { key: 'date', title: 'Date', width: 160 },
      { key: 'customer', title: 'Customer', width: 220 },
      { key: 'pickup', title: 'Pickup', width: 260 },
      { key: 'dropoff', title: 'Dropoff', width: 260 },
      { key: 'status', title: 'Status', width: 140 },
      { key: 'payment', title: 'Payment', width: 140 },
      { key: 'amount', title: 'Amount (€)', width: 140 },
    ];

    // Build metadata table
    const metaRows = [
      ['Company:', companyName],
      ['Report:', labelForRange(timeRange)],
      ['Generated:', new Date().toLocaleString()],
      ['Total Revenue:', revenueData.total],
    ];

    const metaHtml = `
      <table class="meta">
        ${metaRows
          .map(
            ([k, v]) => `
            <tr>
              <td class="meta-label">${escHtml(k)}</td>
              <td class="meta-value">${escHtml(v)}</td>
            </tr>`
          )
          .join('')}
      </table>
    `;

    // Build header
    const headerHtml = `
      <tr>
        ${columns
          .map(
            c => `<th style="width:${c.width}px">${escHtml(c.title)}</th>`
          )
          .join('')}
      </tr>
    `;

    // Build data rows
    const rowsHtml = filtered
      .map(b => {
        const tds = [
          escHtml(b.booking_reference || b._id),
          escHtml(new Date(b.created_at).toLocaleString()),
          escHtml(b.customer_name),
          escHtml(b.pickup_location),
          escHtml(b.dropoff_location),
          escHtml(titleCase(b.booking_status)),
          escHtml(titleCase(b.payment_status)),
          escHtml((b.total_price || 0).toFixed(2)),
        ]
          .map(val => `<td>${val}</td>`) 
          .join('');
        return `<tr>${tds}</tr>`;
      })
      .join('');

    const colgroup = `<colgroup>${columns
      .map(c => `<col style="width:${c.width}px" />`)
      .join('')}</colgroup>`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>${escHtml(companyName)} Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .meta { margin-bottom: 16px; border-collapse: collapse; }
            .meta td { padding: 6px 10px; }
            .meta-label { color: #1f2937; font-weight: 600; }
            .meta-value { color: #111827; }
            .data { border-collapse: collapse; }
            .data th { background: #e6f0ff; color: #0f172a; text-align: left; padding: 10px; border: 1px solid #dbeafe; font-weight: 700; }
            .data td { padding: 8px 10px; border: 1px solid #e5e7eb; }
            .data tr:nth-child(even) td { background: #f9fafb; }
          </style>
        </head>
        <body>
          ${metaHtml}
          <table class="data">
            ${colgroup}
            <thead>${headerHtml}</thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </body>
      </html>
    `;

    const safeCompany = companyName.replace(/[^a-z0-9]+/gi, '-');
    const fileName = `${safeCompany}_Report_${timeRange}.xls`;

    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-lg">Loading reports...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to load reports</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={(v: any) => setTimeRange(v)}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
                  </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export Excel
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{revenueData.total}</p>
                <div className="flex items-center gap-1 text-sm">
                  {growthPct >= 0 ? (
                    <ArrowUpRight className="w-3 h-3 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-red-600" />
                  )}
                  <span className={growthPct >= 0 ? 'text-green-600' : 'text-red-600'}>{revenueData.growth}</span>
                  <span className="text-muted-foreground">vs previous period</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{bookingStats.totalBookings}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{bookingStats.averageValue}</p>
                <p className="text-sm text-muted-foreground">Average Booking</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{bookingStats.completionRate}</p>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="revenue">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="fleet">Fleet</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.monthly.map((month) => (
                    <div key={month.month} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{month.month} {now.getFullYear()}</span>
                        <span className="text-sm text-accent font-medium">€{month.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <Progress value={(month.revenue / Math.max(...revenueData.monthly.map(m => m.revenue), 1)) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{month.bookings} bookings</span>
                        <span>€{month.bookings > 0 ? Math.round(month.revenue / month.bookings) : 0} avg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Top Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRoutes.map((route, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate">{route.route}</span>
                        <span className="text-sm text-accent font-medium">{route.revenue}</span>
                      </div>
                      <Progress value={route.percentage} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{route.bookings} bookings</span>
                        <span>{route.percentage}% of total</span>
                      </div>
                    </div>
                  ))}
                  {topRoutes.length === 0 && (
                    <p className="text-sm text-muted-foreground">No routes in the selected range.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Booking Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-xl font-bold">{filtered.filter(b => b.booking_status === 'pending').length}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-xl font-bold">{filtered.filter(b => b.booking_status === 'confirmed').length}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Cancelled</p>
                  <p className="text-xl font-bold">{filtered.filter(b => b.booking_status === 'cancelled').length}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-xl font-bold">€{revenueTotal.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Customer Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {customerMetrics.map((metric, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">{metric.type}</span>
                        <div className={`flex items-center gap-1 text-sm ${
                          metric.positive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.positive ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {metric.change}
                        </div>
                      </div>
                      <p className="text-xl font-bold text-primary">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">4.8</div>
                    <div className="flex justify-center mb-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className="w-5 h-5 text-accent fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Average Rating (placeholder)</p>
                  </div>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = Math.floor(Math.random() * 30) + 5;
                      const percentage = (count / 127) * 100;
                      return (
                        <div key={rating} className="flex items-center gap-2">
                          <span className="text-sm w-4">{rating}</span>
                          <Star className="w-3 h-3 text-accent fill-current" />
                          <Progress value={percentage} className="flex-1 h-2" />
                          <span className="text-xs text-muted-foreground w-8">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        
        <TabsContent value="fleet" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Fleet Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">{fleetUtilization.utilizationRate}%</div>
                    <p className="text-sm text-muted-foreground">
                      {fleetUtilization.activeVehicles} of {fleetUtilization.totalVehicles} vehicles active
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {fleetUtilization.vehicles.map((vehicle, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{vehicle.model}</span>
                          <span className="text-sm text-muted-foreground">{vehicle.trips} trips</span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{vehicle.hours} hours</span>
                          <span>{vehicle.efficiency}% efficiency</span>
                        </div>
                        <Progress value={vehicle.efficiency} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Popular Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRoutes.map((route, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{route.route}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{route.bookings} bookings</span>
                          <span className="text-accent">{route.revenue}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {topRoutes.length === 0 && (
                    <p className="text-sm text-muted-foreground">No routes in the selected range.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}