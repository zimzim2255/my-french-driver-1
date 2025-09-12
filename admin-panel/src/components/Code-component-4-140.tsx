import React, { useState } from 'react';
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
  Settings,
  Filter,
  MoreHorizontal,
  Check,
  X,
  Archive,
  Star,
  Eye
} from 'lucide-react';

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
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New booking request',
      message: 'Marie Dubois requested a booking for tomorrow at 2:30 PM from CDG Airport to Hotel Plaza Athénée',
      type: 'booking',
      time: '2 minutes ago',
      unread: true,
      priority: 'high',
      actionRequired: true,
      relatedId: 'BK001',
      icon: Calendar
    },
    {
      id: 2,
      title: 'Customer message',
      message: 'James Wilson sent a message about his upcoming trip: "Could we make a stop at the Louvre?"',
      type: 'message',
      time: '15 minutes ago',
      unread: true,
      priority: 'medium',
      actionRequired: true,
      relatedId: 'MSG001',
      icon: MessageSquare
    },
    {
      id: 3,
      title: 'Driver status update',
      message: 'Philippe Martin marked his shift as completed. Total trips today: 8',
      type: 'driver',
      time: '1 hour ago',
      unread: true,
      priority: 'low',
      actionRequired: false,
      relatedId: 'DRV001',
      icon: User
    },
    {
      id: 4,
      title: 'System maintenance completed',
      message: 'Scheduled maintenance completed successfully. All systems are operational.',
      type: 'system',
      time: '2 hours ago',
      unread: false,
      priority: 'low',
      actionRequired: false,
      icon: CheckCircle
    },
    {
      id: 5,
      title: 'Payment received',
      message: 'Payment for booking BK001 has been processed successfully. Amount: €150.00',
      type: 'payment',
      time: '3 hours ago',
      unread: false,
      priority: 'medium',
      actionRequired: false,
      relatedId: 'BK001',
      icon: CheckCircle
    },
    {
      id: 6,
      title: 'Vehicle maintenance due',
      message: 'Mercedes E-Class (ABC-123) is due for maintenance on January 20, 2024',
      type: 'system',
      time: '5 hours ago',
      unread: false,
      priority: 'medium',
      actionRequired: true,
      relatedId: 'VH001',
      icon: AlertTriangle
    },
    {
      id: 7,
      title: 'New customer registration',
      message: 'Sophie Martin has created a new account and completed her profile',
      type: 'system',
      time: '1 day ago',
      unread: false,
      priority: 'low',
      actionRequired: false,
      relatedId: 'CUST001',
      icon: User
    },
    {
      id: 8,
      title: 'Booking cancelled',
      message: 'Booking BK003 for Robert Johnson has been cancelled by the customer',
      type: 'booking',
      time: '1 day ago',
      unread: false,
      priority: 'medium',
      actionRequired: false,
      relatedId: 'BK003',
      icon: X
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');

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
      case 'action':
        return notifications.filter(n => n.actionRequired);
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
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread {unreadCount > 0 && <Badge className="ml-1 bg-accent text-accent-foreground">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="action">
            Action Required {actionRequiredCount > 0 && <Badge className="ml-1 bg-orange-100 text-orange-800">{actionRequiredCount}</Badge>}
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
                {activeTab === 'action' && 'Action Required'}
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