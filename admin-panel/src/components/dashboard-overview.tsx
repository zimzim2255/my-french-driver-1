import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Clock,
  MapPin,
  Star,
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import { dashboardService, bookingService, type DashboardStats, type Booking } from '../services/api';

export function DashboardOverview({ onQuickAction }: { onQuickAction?: (action: string) => void }) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Load dashboard stats
      const statsResponse = await dashboardService.getStats();
      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
      } else {
        throw new Error(statsResponse.error || 'Failed to load dashboard stats');
      }

      // Load recent bookings
      const bookingsResponse = await bookingService.getAll({ 
        limit: 5, 
        page: 1 
      });
      if (bookingsResponse.success && bookingsResponse.data) {
        setRecentBookings(bookingsResponse.data.bookings);
      }

    } catch (err) {
      console.error('Dashboard error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'in_progress':
        return 'secondary';
      case 'completed':
        return 'default';
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-red-600">Error loading dashboard: {error}</p>
        <Button onClick={loadDashboardData} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  const dashboardStats = [
    {
      title: 'Today\'s Bookings',
      value: stats?.today_bookings?.toString() || '0',
      change: `${stats?.week_bookings || 0} this week`,
      icon: Calendar,
      color: 'text-accent'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats?.total_revenue || 0),
      change: `${stats?.month_bookings || 0} bookings this month`,
      icon: DollarSign,
      color: 'text-accent'
    },
    {
      title: 'Total Bookings',
      value: stats?.total_bookings?.toString() || '0',
      change: `${stats?.completed_bookings || 0} completed`,
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Pending Bookings',
      value: stats?.pending_bookings?.toString() || '0',
      change: `${stats?.confirmed_bookings || 0} confirmed`,
      icon: TrendingUp,
      color: 'text-primary'
    }
  ];

  // Calculate top routes from real booking data
  const calculateTopRoutes = () => {
    if (!recentBookings.length) return [];
    
    const routeMap = new Map();
    
    recentBookings.forEach(booking => {
      const route = `${booking.pickup_location} → ${booking.dropoff_location}`;
      if (routeMap.has(route)) {
        const existing = routeMap.get(route);
        routeMap.set(route, {
          route,
          bookings: existing.bookings + 1,
          revenue: existing.revenue + booking.total_price
        });
      } else {
        routeMap.set(route, {
          route,
          bookings: 1,
          revenue: booking.total_price
        });
      }
    });
    
    return Array.from(routeMap.values())
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 4);
  };

  const topRoutes = calculateTopRoutes();

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-primary">Recent Bookings</CardTitle>
            <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" onClick={() => onQuickAction?.('view-all-bookings')}>
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <div key={booking._id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{formatDate(booking.date_time)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{booking.customer_name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {booking.pickup_location} → {booking.dropoff_location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">{formatCurrency(booking.total_price)}</p>
                      <Badge variant={getStatusBadgeVariant(booking.booking_status)}>
                        {booking.booking_status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No recent bookings found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Routes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-primary">Popular Routes</CardTitle>
            <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" onClick={() => onQuickAction?.('analytics')}>
              Analytics
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRoutes.length > 0 ? (
                topRoutes.map((route, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate max-w-48">{route.route}</p>
                      <span className="text-sm text-accent font-medium">{formatCurrency(route.revenue)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{route.bookings} booking{route.bookings !== 1 ? 's' : ''}</span>
                      <span>{Math.round((route.bookings / Math.max(...topRoutes.map(r => r.bookings))) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(route.bookings / Math.max(...topRoutes.map(r => r.bookings))) * 100} 
                      className="h-2"
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No route data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      </div>
  );
}