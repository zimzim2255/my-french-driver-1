import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  User,
  Bell,
  CreditCard,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onClose?: () => void;
  adminName?: string;
  adminRole?: string;
  bookingsBadge?: number;
  messagesBadge?: number;
  notificationsBadge?: number;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bookings', label: 'Bookings', icon: Calendar, badge: '12' },
    { id: 'fleet', label: 'Fleet', icon: Car },
  { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '3' },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell, badge: '3' },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
  ];

export function AdminSidebar({ activeSection, onSectionChange, onClose, adminName, adminRole, bookingsBadge, messagesBadge, notificationsBadge }: AdminSidebarProps) {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Logo/Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-sidebar-foreground text-lg font-medium">MyFrenchDriver</h2>
              <p className="text-sidebar-foreground/70 text-sm">Admin Panel</p>
            </div>
          </div>
          
          {/* Close Button - Only visible on mobile */}
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="md:hidden h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start gap-3 h-11 ${
                isActive 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {(() => {
                const badge = item.id === 'bookings' ? bookingsBadge
                  : item.id === 'messages' ? messagesBadge
                  : item.id === 'notifications' ? notificationsBadge
                  : undefined;
                return typeof badge === 'number' && badge > 0 ? (
                  <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs">
                    {badge}
                  </Badge>
                ) : null;
              })()}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/30">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-accent-foreground text-sm font-medium">
              {(adminName || '-').split(' ').filter(Boolean).map(n => n[0]).join('') || '-'}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sidebar-foreground text-sm font-medium">{adminName || '-'}</p>
            <p className="text-sidebar-foreground/70 text-xs">{adminRole || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}