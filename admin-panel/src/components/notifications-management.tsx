import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { 
  Bell, 
  Calendar, 
  MessageSquare, 
  User, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  MoreHorizontal,
  Check,
  X,
  Archive,
  Star,
  Eye,
  Loader2
} from 'lucide-react';
import { bookingService, type Booking } from '../services/api';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'booking' | 'message' | 'driver' | 'system' | 'payment';
  time: string;
  unread: boolean;
  priority: 'low' | 'medium' | 'high';
  actionRequired?: boolean;
  relatedId?: string;
  icon: any;
}

export function NotificationsManagement() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const [activeTab, setActiveTab] = useState('all');

  // Load real data from API and generate notifications
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');

        const bookingsResponse = await bookingService.getAll({ limit: 100 });
        if (bookingsResponse.success && bookingsResponse.data) {
          const bookingsData: Booking[] = bookingsResponse.data.bookings || [];
          setBookings(bookingsData);
          const generated = generateNotificationsFromBookings(bookingsData);
          setNotifications(generated);
        } else {
          setError(bookingsResponse.error || 'Failed to load notifications');
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Failed to load notifications';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Build notifications from real bookings
  const generateNotificationsFromBookings = (bookings: Booking[]): Notification[] => {
    let id = 1;

    const timeAgo = (d: Date): string => {
      const now = new Date().getTime();
      const diff = now - d.getTime();
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);
      if (minutes < 1) return 'Just now';
      if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      return `${days} day${days > 1 ? 's' : ''} ago`;
    };

    const list: Notification[] = [];
    bookings.forEach((b) => {
      const created = new Date(b.created_at);
      const recent = Date.now() - created.getTime() < 24 * 60 * 60 * 1000;

      list.push({
        id: id++,
        title: b.status === 'confirmed' ? 'Booking confirmed' : b.status === 'cancelled' ? 'Booking cancelled' : 'New booking request',
        message: `${b.customer_name} • ${b.pickup_location} → ${b.dropoff_location}`,
        type: 'booking',
        time: timeAgo(created),
        unread: recent && b.status === 'pending',
        priority: b.status === 'pending' ? 'high' : 'medium',
        actionRequired: b.status === 'pending',
        relatedId: b.booking_reference || b._id.substring(0, 8),
        icon: Calendar
      });

      if (b.payment_status === 'paid') {
        list.push({
          id: id++,
          title: 'Payment received',
          message: `€${b.total_price.toFixed(2)} received for booking ${b.booking_reference || b._id.substring(0, 8)}`,
          type: 'payment',
          time: timeAgo(created),
          unread: false,
          priority: 'medium',
          actionRequired: false,
          relatedId: b.booking_reference || b._id.substring(0, 8),
          icon: CheckCircle
        });
      } else if (b.payment_status === 'pending') {
        list.push({
          id: id++,
          title: 'Payment pending',
          message: `Awaiting €${b.total_price.toFixed(2)} for booking ${b.booking_reference || b._id.substring(0, 8)}`,
          type: 'payment',
          time: timeAgo(created),
          unread: true,
          priority: 'high',
          actionRequired: true,
          relatedId: b.booking_reference || b._id.substring(0, 8),
          icon: AlertTriangle
        });
      } else if (b.payment_status === 'failed') {
        list.push({
          id: id++,
          title: 'Payment failed',
          message: `Payment failed for booking ${b.booking_reference || b._id.substring(0, 8)} • Amount €${b.total_price.toFixed(2)}`,
          type: 'payment',
          time: timeAgo(created),
          unread: true,
          priority: 'high',
          actionRequired: true,
          relatedId: b.booking_reference || b._id.substring(0, 8),
          icon: X
        });
      }
    });

    return list.sort((a, b) => {
      const order = { high: 3, medium: 2, low: 1 } as const;
      const p = order[b.priority] - order[a.priority];
      if (p !== 0) return p;
      if (a.unread !== b.unread) return a.unread ? -1 : 1;
      const toMins = (t: string) => t.includes('Just now') ? 0
        : t.includes('minute') ? parseInt(t)
        : t.includes('hour') ? parseInt(t) * 60
        : parseInt(t) * 1440;
      return toMins(a.time) - toMins(b.time);
    });
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleNotificationAction = (notification: Notification) => {
    // Mark as read when clicked
    markAsRead(notification.id);
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'booking':
        // Navigate to bookings section with specific booking
        console.log(`Navigate to booking ${notification.relatedId}`);
        break;
      case 'message':
        // Navigate to messages section
        console.log(`Navigate to message ${notification.relatedId}`);
        break;
      case 'driver':
        // Navigate to fleet section with specific driver
        console.log(`Navigate to driver ${notification.relatedId}`);
        break;
      default:
        console.log('View notification details');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'text-accent';
      case 'message': return 'text-blue-600';
      case 'driver': return 'text-primary';
      case 'system': return 'text-orange-600';
      case 'payment': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-accent/20 text-accent-foreground border-accent/30';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(n => n.unread);
            case 'booking':
        return notifications.filter(n => n.type === 'booking');
      case 'messages':
        return notifications.filter(n => n.type === 'message');
      default:
        return notifications;
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired).length;

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading notifications...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Notifications</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-primary">Notification Center</h2>
          <p className="text-muted-foreground">
            Manage all your notifications and alerts
          </p>
        </div>
        <div className="flex items-center gap-3">
                    {unreadCount > 0 && (
            <Button onClick={markAllAsRead} className="bg-accent hover:bg-accent/90">
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-primary">{notifications.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-primary">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-primary">{actionRequiredCount}</p>
                <p className="text-sm text-muted-foreground">Action Required</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-primary">{notifications.length - unreadCount}</p>
                <p className="text-sm text-muted-foreground">Read</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread {unreadCount > 0 && <Badge className="ml-1 bg-accent text-accent-foreground">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="booking">Bookings</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Bell className="w-5 h-5" />
                {activeTab === 'all' && 'All Notifications'}
                {activeTab === 'unread' && 'Unread Notifications'}
                                {activeTab === 'booking' && 'Booking Notifications'}
                {activeTab === 'messages' && 'Message Notifications'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {getFilteredNotifications().map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border transition-all hover:shadow-sm cursor-pointer ${
                          notification.unread 
                            ? 'bg-accent/5 border-l-4 border-l-accent hover:bg-accent/10' 
                            : 'hover:bg-secondary/50'
                        }`}
                        onClick={() => handleNotificationAction(notification)}
                      >
                        <div className="flex gap-4">
                          <div className={`mt-1 ${getTypeColor(notification.type)}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-primary">{notification.title}</h4>
                                {notification.unread && (
                                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <Badge className={getPriorityColor(notification.priority)} variant="outline">
                                  {notification.priority}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {notification.type}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {notification.time}
                              </div>
                              
                              <div className="flex items-center gap-1">
                                {notification.actionRequired && (
                                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                                    Action Required
                                  </Badge>
                                )}
                                {notification.relatedId && (
                                  <Badge variant="outline" className="text-xs">
                                    {notification.relatedId}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 pt-2">
                              {notification.actionRequired && (
                                <Button size="sm" className="bg-accent hover:bg-accent/90">
                                  Take Action
                                </Button>
                              )}
                              {notification.unread && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                >
                                  <Check className="w-3 h-3 mr-1" />
                                  Mark Read
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                              >
                                <X className="w-3 h-3 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {getFilteredNotifications().length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No notifications found</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}