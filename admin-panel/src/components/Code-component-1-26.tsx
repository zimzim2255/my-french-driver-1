import React from 'react';
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
  ArrowUpRight
} from 'lucide-react';

export function DashboardOverview() {
  const stats = [
    {
      title: 'Today\'s Bookings',
      value: '12',
      change: '+3 from yesterday',
      icon: Calendar,
      color: 'text-accent'
    },
    {
      title: 'Monthly Revenue',
      value: '€15,420',
      change: '+12% from last month',
      icon: DollarSign,
      color: 'text-accent'
    },
    {
      title: 'Active Customers',
      value: '847',
      change: '+24 this week',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Fleet Utilization',
      value: '78%',
      change: '+5% efficiency',
      icon: TrendingUp,
      color: 'text-primary'
    }
  ];

  const recentBookings = [
    {
      id: 'BK001',
      customer: 'Marie Dubois',
      route: 'CDG Airport → Hotel Plaza Athénée',
      time: '14:30',
      status: 'confirmed',
      value: '€85'
    },
    {
      id: 'BK002',
      customer: 'James Wilson',
      route: 'Eiffel Tower → Louvre Museum',
      time: '16:45',
      status: 'in-progress',
      value: '€45'
    },
    {
      id: 'BK003',
      customer: 'Sofia Martinez',
      route: 'Hotel Le Bristol → Versailles',
      time: '18:00',
      status: 'pending',
      value: '€120'
    }
  ];

  const topRoutes = [
    { route: 'CDG Airport ↔ Paris Center', bookings: 45, revenue: '€3,240' },
    { route: 'Eiffel Tower Tours', bookings: 32, revenue: '€1,890' },
    { route: 'Versailles Day Trip', bookings: 18, revenue: '€2,160' },
    { route: 'Orly Airport ↔ Paris', bookings: 24, revenue: '€1,680' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
            <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{booking.time}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{booking.customer}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {booking.route}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">{booking.value}</p>
                    <Badge 
                      variant={
                        booking.status === 'confirmed' ? 'default' : 
                        booking.status === 'in-progress' ? 'secondary' : 'outline'
                      }
                      className={
                        booking.status === 'confirmed' ? 'bg-accent text-accent-foreground' :
                        booking.status === 'in-progress' ? 'bg-primary text-primary-foreground' : ''
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Routes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-primary">Popular Routes</CardTitle>
            <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Analytics
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRoutes.map((route, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{route.route}</p>
                    <span className="text-sm text-accent font-medium">{route.revenue}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{route.bookings} bookings this month</span>
                    <span>{Math.round((route.bookings / 100) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(route.bookings / 50) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              New Booking
            </Button>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Users className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Star className="w-4 h-4 mr-2" />
              Review Management
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              Update Routes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}