import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
// Try to use existing Sheet component (if present in UI kit). If not, we'll render a simple fallback panel.
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { 
  Bell, 
  Calendar, 
  MessageSquare, 
  User, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Car,
  CreditCard,
  Star,
  Settings,
  FileText,
  X
} from 'lucide-react';
import { bookingService, type Booking } from '../services/api';

interface NotificationsDropdownProps {
  onSectionChange?: (section: string) => void;
  onOpened?: () => void;
}

export function NotificationsDropdown({ onSectionChange, onOpened }: NotificationsDropdownProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await bookingService.getAll({ limit: 50 });
        if (res.success && res.data) {
          const bookings: Booking[] = res.data.bookings || [];
          const items: any[] = buildNotificationsFromBookings(bookings);
          setNotifications(items);
        } else {
          setError(res.error || 'Failed to load notifications');
          setNotifications([]);
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Failed to load notifications';
        setError(msg);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const timeAgo = (d: Date): string => {
    const now = Date.now();
    const diff = now - d.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const buildNotificationsFromBookings = (bookings: Booking[]) => {
    let id = 1;
    const items: any[] = [];

    bookings.forEach((b) => {
      const created = new Date(b.created_at);
      const recent = Date.now() - created.getTime() < 24 * 60 * 60 * 1000;

      items.push({
        id: id++,
        title: b.status === 'confirmed' ? 'Booking confirmed' : b.status === 'cancelled' ? 'Booking cancelled' : 'New booking request',
        message: `${b.customer_name} • ${b.pickup_location} → ${b.dropoff_location}`,
        type: 'booking',
        time: timeAgo(created),
        unread: recent && b.status === 'pending',
        icon: Calendar,
        action: () => onSectionChange?.('bookings')
      });

      if (b.payment_status === 'paid') {
        items.push({
          id: id++,
          title: 'Payment received',
          message: `€${b.total_price.toFixed(2)} received for booking ${b.booking_reference || b._id.substring(0, 8)}`,
          type: 'payment',
          time: timeAgo(created),
          unread: false,
          icon: CheckCircle,
          action: () => onSectionChange?.('bookings')
        });
      } else if (b.payment_status === 'pending') {
        items.push({
          id: id++,
          title: 'Payment pending',
          message: `Awaiting €${b.total_price.toFixed(2)} for booking ${b.booking_reference || b._id.substring(0, 8)}`,
          type: 'payment',
          time: timeAgo(created),
          unread: true,
          icon: AlertTriangle,
          action: () => onSectionChange?.('bookings')
        });
      } else if (b.payment_status === 'failed') {
        items.push({
          id: id++,
          title: 'Payment failed',
          message: `Payment failed for booking ${b.booking_reference || b._id.substring(0, 8)} • Amount €${b.total_price.toFixed(2)}`,
          type: 'payment',
          time: timeAgo(created),
          unread: true,
          icon: AlertTriangle,
          action: () => onSectionChange?.('bookings')
        });
      }
    });

    return items.sort((a, b) => {
      const prio = (t: string) => t === 'payment' ? 2 : 1; // elevate payment
      const p = prio(b.type) - prio(a.type);
      if (p !== 0) return p;
      if (a.unread !== b.unread) return a.unread ? -1 : 1;
      const toMins = (t: string) => t.includes('Just now') ? 0
        : t.includes('minute') ? parseInt(t)
        : t.includes('hour') ? parseInt(t) * 60
        : parseInt(t) * 1440;
      return toMins(a.time) - toMins(b.time);
    });
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
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

  return (
    <>
      {/* Keep popover for quick peek */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="hover:bg-accent/10 relative" onClick={() => { setSheetOpen(true); markAllRead(); onOpened?.(); }}>
            <Bell className="w-5 h-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-primary">Notifications</h3>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  {unreadCount} new
                </Badge>
              )}
            </div>
          </div>
          <ScrollArea className="h-80">
            <div className="p-2">
              {notifications.slice(0,5).map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg mb-1 cursor-pointer transition-colors hover:bg-secondary/50 ${
                      notification.unread ? 'bg-accent/5 border-l-2 border-l-accent' : ''
                    }`}
                    onClick={() => {
                      notification.action();
                      setSheetOpen(true);
                    }}
                  >
                    <div className="flex gap-3">
                      <div className={`mt-1 ${getTypeColor(notification.type)}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-accent rounded-full mt-1"></div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <div className="p-3 border-t">
            <Button 
              variant="outline" 
              className="w-full" 
              size="sm"
              onClick={() => {
                setSheetOpen(true);
                markAllRead();
                onOpened?.();
                onSectionChange?.('notifications');
              }}
            >
              View All Notifications
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Slide-in Sheet for full notifications list */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          {/* hidden trigger - we open sheet programmatically */}
          <span style={{ display: 'none' }} />
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-96 p-0">
          <SheetHeader className="p-4 border-b flex items-center justify-between">
            <SheetTitle>Notifications</SheetTitle>
            <Button variant="ghost" size="icon" onClick={() => setSheetOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-72px)]">
            <div className="p-3">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg mb-3 cursor-pointer transition-colors hover:bg-secondary/50 flex gap-3 items-start ${
                      notification.unread ? 'bg-accent/5 border-l-2 border-l-accent' : ''
                    }`}
                    onClick={() => {
                      notification.action();
                      // optionally mark read in future
                    }}
                  >
                    <div className={`${getTypeColor(notification.type)} mt-1`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{notification.title}</p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full" onClick={() => setSheetOpen(false)}>
              Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}