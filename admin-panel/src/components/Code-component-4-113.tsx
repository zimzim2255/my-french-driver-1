import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Key,
  Shield,
  Bell,
  Globe,
  Calendar,
  Award,
  Clock,
  Edit
} from 'lucide-react';

export function ProfileManagement() {
  const [notifications, setNotifications] = useState({
    newBookings: true,
    customerMessages: true,
    systemAlerts: false,
    weeklyReports: true
  });

  const adminProfile = {
    id: 'ADMIN001',
    name: 'Jean-Pierre Dubois',
    email: 'jp.dubois@myfrenchdriver.com',
    phone: '+33 1 42 86 87 88',
    role: 'Super Administrator',
    joinDate: '2020-03-15',
    lastLogin: '2024-01-16 09:30',
    location: 'Paris, France',
    language: 'French',
    timezone: 'Europe/Paris',
    bio: 'Experienced administrator managing MyFrenchDriver operations for over 4 years. Passionate about luxury transportation and customer service excellence.',
    permissions: ['Full Access', 'User Management', 'System Settings', 'Reports'],
    stats: {
      totalSessions: 1847,
      avgSessionTime: '2h 45m',
      lastActive: '2 minutes ago',
      accountAge: '4 years'
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl bg-accent text-accent-foreground">
                  {adminProfile.name.split(' ').map(n => n[0]).join('')}
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
                  <h2 className="text-2xl font-semibold text-primary">{adminProfile.name}</h2>
                  <p className="text-muted-foreground">{adminProfile.role}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {adminProfile.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {adminProfile.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {adminProfile.location}
                    </div>
                  </div>
                </div>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <p className="text-lg font-semibold text-primary">{adminProfile.stats.totalSessions}</p>
                  <p className="text-xs text-muted-foreground">Total Sessions</p>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <p className="text-lg font-semibold text-primary">{adminProfile.stats.avgSessionTime}</p>
                  <p className="text-xs text-muted-foreground">Avg Session</p>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <p className="text-lg font-semibold text-primary">{adminProfile.stats.accountAge}</p>
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
                    <Input defaultValue="Jean-Pierre" />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input defaultValue="Dubois" />
                  </div>
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input defaultValue={adminProfile.email} type="email" />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input defaultValue={adminProfile.phone} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input defaultValue={adminProfile.location} />
                </div>
                <div>
                  <Label>Bio</Label>
                  <Textarea 
                    defaultValue={adminProfile.bio}
                    rows={3}
                  />
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Account ID</Label>
                  <Input value={adminProfile.id} disabled />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input value={adminProfile.role} disabled />
                </div>
                <div>
                  <Label>Join Date</Label>
                  <Input value={adminProfile.joinDate} disabled />
                </div>
                <div>
                  <Label>Last Login</Label>
                  <Input value={adminProfile.lastLogin} disabled />
                </div>
                
                <div>
                  <Label className="mb-3 block">Permissions</Label>
                  <div className="flex flex-wrap gap-2">
                    {adminProfile.permissions.map((permission, index) => (
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
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div>
                  <Label>New Password</Label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div>
                  <Label>Confirm New Password</Label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Key className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Login History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: '2024-01-16 09:30', device: 'MacBook Pro - Chrome', location: 'Paris, France', status: 'current' },
                    { date: '2024-01-15 18:45', device: 'iPhone - Safari', location: 'Paris, France', status: 'success' },
                    { date: '2024-01-15 08:15', device: 'Windows PC - Edge', location: 'Paris, France', status: 'success' },
                    { date: '2024-01-14 16:30', device: 'MacBook Pro - Chrome', location: 'Paris, France', status: 'success' }
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">System Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Language</Label>
                  <Input defaultValue={adminProfile.language} />
                </div>
                <div>
                  <Label>Timezone</Label>
                  <Input defaultValue={adminProfile.timezone} />
                </div>
                <div>
                  <Label>Date Format</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <Label>Time Format</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>24 Hour</option>
                    <option>12 Hour</option>
                  </select>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>

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
                <Button className="w-full bg-accent hover:bg-accent/90">
                  <Bell className="w-4 h-4 mr-2" />
                  Update Notifications
                </Button>
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
                  { action: 'Updated system settings', time: '2 minutes ago', type: 'settings' },
                  { action: 'Approved new booking BK001', time: '1 hour ago', type: 'booking' },
                  { action: 'Responded to customer message', time: '3 hours ago', type: 'message' },
                  { action: 'Added new driver: Claire Dubois', time: '1 day ago', type: 'fleet' },
                  { action: 'Generated monthly report', time: '2 days ago', type: 'report' },
                  { action: 'Updated customer profile: Marie Dubois', time: '3 days ago', type: 'customer' }
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