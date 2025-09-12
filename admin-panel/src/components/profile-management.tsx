import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Key,
  Shield,
  Bell
} from 'lucide-react';
import apiClient, { authService, type Admin } from '../services/api';

function roleLabel(role?: string) {
  switch (role) {
    case 'super_admin':
      return 'Super Administrator';
    case 'admin':
      return 'Administrator';
    case 'manager':
      return 'Manager';
    case 'support':
      return 'Support';
    default:
      return role || '-';
  }
}

function formatDate(date?: string | Date) {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleString();
}

function computeAccountAge(created_at?: string | Date) {
  if (!created_at) return '-';
  const created = new Date(created_at);
  if (Number.isNaN(created.getTime())) return '-';
  const now = new Date();
  const diff = now.getTime() - created.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 31) return `${days} days`;
  const months = Math.floor(days / 30);
  if (months < 24) return `${months} months`;
  const years = Math.floor(months / 12);
  return `${years} years`;
}

export function ProfileManagement() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);

  // Notification UI state (initialized from admin preferences when loaded)
  const [notifications, setNotifications] = useState({
    newBookings: true,
    customerMessages: false,
    systemAlerts: true,
    weeklyReports: false,
  });

  // Basic info form state
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveError, setSaveError] = useState<string | null>(null);

  // Password change state
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [pwStatus, setPwStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [pwError, setPwError] = useState<string | null>(null);

  // Notifications save state
  const [notifStatus, setNotifStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [notifError, setNotifError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await authService.getProfile();
        if (!mounted) return;
        if (res.success && res.data?.admin) {
          const a = res.data.admin as Admin;
          setAdmin(a);
          // Map notification preferences (where available)
          const prefs = (a as any).preferences?.notifications || {};
          setNotifications(prev => ({
            newBookings: typeof prefs.new_bookings === 'boolean' ? prefs.new_bookings : prev.newBookings,
            systemAlerts: typeof prefs.system_alerts === 'boolean' ? prefs.system_alerts : prev.systemAlerts,
            // Not in backend schema; keep defaults for now
            customerMessages: prev.customerMessages,
            weeklyReports: prev.weeklyReports,
          }));
          setError(null);
        } else {
          setError(res.error || 'Failed to load profile');
        }
      } catch (e: any) {
        setError(e?.message || 'Failed to load profile');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const ui = useMemo(() => {
    const name = admin?.name || '';
    const [firstName, ...rest] = name.split(' ').filter(Boolean);
    const lastName = rest.join(' ');

    const stats = {
      totalSessions: (admin as any)?.total_logins ?? 0,
      avgSessionTime: '-',
      lastActive: (admin as any)?.last_action ? formatDate((admin as any).last_action) : '-',
      accountAge: computeAccountAge((admin as any)?.created_at),
    };

    const preferences = (admin as any)?.preferences || {};

    return {
      id: (admin as any)?._id || '-',
      name: name || '-',
      firstName: firstName || '',
      lastName: lastName || '',
      email: admin?.email || '',
      phone: (admin as any)?.phone || '',
      role: roleLabel(admin?.role),
      joinDate: (admin as any)?.created_at ? formatDate((admin as any).created_at) : '-',
      lastLogin: (admin as any)?.last_login ? formatDate((admin as any).last_login) : '-',
      location: '', // Not present in backend model; left empty
      language: preferences.language || 'en',
      timezone: preferences.timezone || 'Europe/Paris',
      permissions: admin?.permissions || [],
      stats,
    };
  }, [admin]);

  // initialize form when admin/ui changes
  useEffect(() => {
    if (!ui) return;
    setForm({
      firstName: ui.firstName || '',
      lastName: ui.lastName || '',
      email: ui.email || '',
      phone: ui.phone || '',
      location: ui.location || '',
    });
  }, [ui.firstName, ui.lastName, ui.email, ui.phone, ui.location]);

  const handleChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, [key]: value }));
    setSaveStatus('idle');
    setSaveError(null);
  };

  const handleSave = async () => {
    try {
      setSaveStatus('saving');
      setSaveError(null);
      const name = [form.firstName, form.lastName].filter(Boolean).join(' ').trim();
      const payload: any = {};
      if (name && name !== (admin?.name || '')) payload.name = name;
      if (form.phone && form.phone !== (admin as any)?.phone) payload.phone = form.phone;
      // location and email are not supported by backend profile update; skip them

      // If nothing changed, just mark success
      if (Object.keys(payload).length === 0) {
        setSaveStatus('success');
        return;
      }

      const res = await apiClient.put<{ admin: Admin; message: string }>('/auth/profile', payload);
      if (!res.success || !res.data?.admin) {
        setSaveStatus('error');
        setSaveError(res.error || 'Failed to update profile');
        return;
      }
      setAdmin(res.data.admin);
      setSaveStatus('success');
    } catch (e: any) {
      setSaveStatus('error');
      setSaveError(e?.message || 'Failed to update profile');
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      setPwStatus('saving');
      setPwError(null);
      if (!pw.current || !pw.next || !pw.confirm) {
        setPwStatus('error');
        setPwError('Please fill in all password fields.');
        return;
      }
      if (pw.next !== pw.confirm) {
        setPwStatus('error');
        setPwError('New password and confirmation do not match.');
        return;
      }
      const res = await apiClient.put<{ message: string }>(
        '/auth/change-password',
        { currentPassword: pw.current, newPassword: pw.next }
      );
      if (!res.success) {
        setPwStatus('error');
        setPwError(res.error || 'Failed to change password');
        return;
      }
      setPwStatus('success');
      setPw({ current: '', next: '', confirm: '' });
    } catch (e: any) {
      setPwStatus('error');
      setPwError(e?.message || 'Failed to change password');
    }
  };

  const handleUpdateNotifications = async () => {
    try {
      setNotifStatus('saving');
      setNotifError(null);
      const payload: any = {
        preferences: {
          notifications: {
            new_bookings: notifications.newBookings,
            system_alerts: notifications.systemAlerts,
          }
        }
      };
      const res = await apiClient.put<{ admin: Admin; message: string }>(
        '/auth/profile',
        payload
      );
      if (!res.success || !res.data?.admin) {
        setNotifStatus('error');
        setNotifError(res.error || 'Failed to update notifications');
        return;
      }
      setAdmin(res.data.admin);
      setNotifStatus('success');
    } catch (e: any) {
      setNotifStatus('error');
      setNotifError(e?.message || 'Failed to update notifications');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">Loading profile...</CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 text-red-600">{error}</CardContent>
        </Card>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">No profile data available.</CardContent>
        </Card>
      </div>
    );
  }

  const initials = ui.name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('');

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl bg-accent text-accent-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent hover:bg-accent/90"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-primary">{ui.name}</h2>
                  <p className="text-muted-foreground">{ui.role}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {ui.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {ui.phone || '-'}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {ui.location || '-'}
                    </div>
                  </div>
                </div>
                {/* Edit Profile button removed */}
              </div>

              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <p className="text-lg font-semibold text-primary">{ui.stats.totalSessions}</p>
                  <p className="text-xs text-muted-foreground">Total Sessions</p>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <p className="text-lg font-semibold text-primary">{ui.stats.avgSessionTime}</p>
                  <p className="text-xs text-muted-foreground">Avg Session</p>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <p className="text-lg font-semibold text-primary">{ui.stats.accountAge}</p>
                  <p className="text-xs text-muted-foreground">Account Age</p>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <p className="text-lg font-semibold text-accent">Online</p>
                  <p className="text-xs text-muted-foreground">Status</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input value={form.firstName} onChange={handleChange('firstName')} />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input value={form.lastName} onChange={handleChange('lastName')} />
                  </div>
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input value={form.email} type="email" disabled />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input value={form.phone} onChange={handleChange('phone')} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input value={form.location} onChange={handleChange('location')} />
                </div>
                <div className="flex items-center gap-3">
                  <Button className="w-full bg-accent hover:bg-accent/90" onClick={handleSave} disabled={saveStatus === 'saving'}>
                    <Save className="w-4 h-4 mr-2" />
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved' : 'Save Changes'}
                  </Button>
                </div>
                {saveStatus === 'error' && saveError && (
                  <p className="text-sm text-red-600">{saveError}</p>
                )}
                {saveStatus === 'success' && (
                  <p className="text-sm text-green-600">Profile updated successfully.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Account ID</Label>
                  <Input value={ui.id} disabled />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input value={ui.role} disabled />
                </div>
                <div>
                  <Label>Join Date</Label>
                  <Input value={ui.joinDate} disabled />
                </div>
                <div>
                  <Label>Last Login</Label>
                  <Input value={ui.lastLogin} disabled />
                </div>

                <div>
                  <Label className="mb-3 block">Permissions</Label>
                  <div className="flex flex-wrap gap-2">
                    {(ui.permissions || []).map((permission, index) => (
                      <Badge key={index} className="bg-primary text-primary-foreground">
                        <Shield className="w-3 h-3 mr-1" />
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Password & Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                <Label>Current Password</Label>
                <Input type="password" placeholder="Enter current password" value={pw.current} onChange={(e) => { setPw(p => ({ ...p, current: e.target.value })); setPwStatus('idle'); setPwError(null); }} />
                </div>
                <div>
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" value={pw.next} onChange={(e) => { setPw(p => ({ ...p, next: e.target.value })); setPwStatus('idle'); setPwError(null); }} />
                </div>
                <div>
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="Confirm new password" value={pw.confirm} onChange={(e) => { setPw(p => ({ ...p, confirm: e.target.value })); setPwStatus('idle'); setPwError(null); }} />
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={handlePasswordUpdate} disabled={pwStatus === 'saving'}>
                <Key className="w-4 h-4 mr-2" />
                {pwStatus === 'saving' ? 'Updating...' : pwStatus === 'success' ? 'Updated' : 'Update Password'}
                </Button>
                {pwStatus === 'error' && pwError && (
                <p className="text-sm text-red-600">{pwError}</p>
                )}
                {pwStatus === 'success' && (
                <p className="text-sm text-green-600">Password changed successfully.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Login History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Placeholder demo data; can be wired to backend audit logs later */}
                  {[
                    { date: ui.lastLogin, device: 'MacBook Pro - Chrome', location: 'Paris, France', status: 'current' },
                    { date: '-', device: 'iPhone - Safari', location: 'Paris, France', status: 'success' },
                    { date: '-', device: 'Windows PC - Edge', location: 'Paris, France', status: 'success' },
                    { date: '-', device: 'MacBook Pro - Chrome', location: 'Paris, France', status: 'success' }
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{session.device}</p>
                        <p className="text-xs text-muted-foreground">{session.date} • {session.location}</p>
                      </div>
                      <Badge variant={session.status === 'current' ? 'default' : 'outline'}>
                        {session.status === 'current' ? 'Current' : 'Success'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries({
                  'New Bookings': 'newBookings',
                  'Customer Messages': 'customerMessages',
                  'System Alerts': 'systemAlerts',
                  'Weekly Reports': 'weeklyReports'
                }).map(([label, key]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <Label>{label}</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about {label.toLowerCase()}
                      </p>
                    </div>
                    <Switch
                      checked={notifications[key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications(prev => ({ ...prev, [key]: checked }))
                      }
                    />
                  </div>
                ))}
                <Button className="w-full bg-accent hover:bg-accent/90" onClick={handleUpdateNotifications} disabled={notifStatus === 'saving'}>
                  <Bell className="w-4 h-4 mr-2" />
                  {notifStatus === 'saving' ? 'Updating...' : notifStatus === 'success' ? 'Updated' : 'Update Notifications'}
                </Button>
                {notifStatus === 'error' && notifError && (
                  <p className="text-sm text-red-600">{notifError}</p>
                )}
                {notifStatus === 'success' && (
                  <p className="text-sm text-green-600">Notification preferences updated.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Updated system settings', time: ui.stats.lastActive, type: 'settings' },
                  { action: 'Approved new booking BK001', time: '-', type: 'booking' },
                  { action: 'Responded to customer message', time: '-', type: 'message' },
                  { action: 'Added new driver: Claire Dubois', time: '-', type: 'fleet' },
                  { action: 'Generated monthly report', time: '-', type: 'report' },
                  { action: 'Updated customer profile: Marie Dubois', time: '-', type: 'customer' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
