import React, { useState } from 'react';
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
  Car,
  Calendar,
  Download,
  Filter,
  Clock,
  MapPin,
  Star,
  Target,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [reportType, setReportType] = useState('revenue');

  const revenueData = {
    total: '€45,120',
    growth: '+15.2%',
    monthly: [
      { month: 'Jan', revenue: 38420, bookings: 145 },
      { month: 'Feb', revenue: 42180, bookings: 162 },
      { month: 'Mar', revenue: 39650, bookings: 138 },
      { month: 'Apr', revenue: 45120, bookings: 178 },
      { month: 'May', revenue: 41980, bookings: 156 },
      { month: 'Jun', revenue: 47250, bookings: 189 }
    ]
  };

  const bookingStats = {
    totalBookings: 1248,
    completedBookings: 1186,
    canceledBookings: 42,
    pendingBookings: 20,
    averageValue: '€72',
    completionRate: '95.0%'
  };

  const topRoutes = [
    { route: 'CDG Airport ↔ Paris Center', bookings: 156, revenue: '€11,240', percentage: 85 },
    { route: 'Eiffel Tower → Louvre Museum', bookings: 89, revenue: '€4,005', percentage: 65 },
    { route: 'Versailles Day Trip', bookings: 67, revenue: '€8,040', percentage: 55 },
    { route: 'Orly Airport ↔ Paris', bookings: 78, revenue: '€5,460', percentage: 45 },
    { route: 'Business District Tours', bookings: 45, revenue: '€3,150', percentage: 35 }
  ];

  const customerMetrics = [
    { type: 'New Customers', value: 127, change: '+23%', positive: true },
    { type: 'Returning Customers', value: 89, change: '+12%', positive: true },
    { type: 'VIP Customers', value: 34, change: '+8%', positive: true },
    { type: 'Corporate Accounts', value: 15, change: '+25%', positive: true }
  ];

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

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
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
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="bookings">Bookings</SelectItem>
              <SelectItem value="customers">Customers</SelectItem>
              <SelectItem value="fleet">Fleet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Download className="w-4 h-4 mr-2" />
          Export Report
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
                  <ArrowUpRight className="w-3 h-3 text-green-600" />
                  <span className="text-green-600">{revenueData.growth}</span>
                  <span className="text-muted-foreground">vs last month</span>
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
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
                        <span className="text-sm font-medium">{month.month} 2024</span>
                        <span className="text-sm text-accent font-medium">€{month.revenue.toLocaleString()}</span>
                      </div>
                      <Progress value={(month.revenue / 50000) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{month.bookings} bookings</span>
                        <span>€{Math.round(month.revenue / month.bookings)} avg</span>
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
                  {topRoutes.slice(0, 5).map((route, index) => (
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
                </div>
              </CardContent>
            </Card>
          </div>
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
                    <p className="text-sm text-muted-foreground">Average Rating (127 reviews)</p>
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

        <TabsContent value="drivers" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Driver Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {driverPerformance.map((driver, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                          <span className="text-accent-foreground font-medium text-sm">
                            {driver.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">{driver.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{driver.totalTrips} trips</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-accent fill-current" />
                              {driver.rating}
                            </div>
                            <span className="text-accent font-medium">{driver.revenue}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Efficiency Rating</span>
                        <span>{driver.efficiency}%</span>
                      </div>
                      <Progress value={driver.efficiency} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}