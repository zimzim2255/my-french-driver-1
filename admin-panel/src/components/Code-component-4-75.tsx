import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  Settings,
  Bell,
  Shield,
  CreditCard,
  Mail,
  Phone,
  Users,
  Globe,
  Clock,
  Save,
  Key,
  AlertTriangle,
  CheckCircle,
  Upload,
  Download
} from 'lucide-react';

export function SystemSettings() {
  const [notifications, setNotifications] = useState({
    newBookings: true,
    paymentUpdates: true,
    systemAlerts: true,
    customerMessages: true,
    maintenanceReminders: false,
    weeklyReports: true
  });

  const adminUsers = [
    {
      id: 'admin001',
      name: 'Jean-Pierre Dubois',
      email: 'jp.dubois@myfrenchdriver.com',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2024-01-16 09:30'
    },
    {
      id: 'admin002',
      name: 'Marie Claire',
      email: 'marie.claire@myfrenchdriver.com',
      role: 'Operations Manager',
      status: 'active',
      lastLogin: '2024-01-16 08:15'
    },
    {
      id: 'admin003',
      name: 'Antoine Dubois',
      email: 'antoine.dubois@myfrenchdriver.com',
      role: 'Customer Service',
      status: 'inactive',
      lastLogin: '2024-01-14 16:45'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Settings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{adminUsers.length}</p>
                <p className="text-sm text-muted-foreground">Admin Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">2</p>
                <p className="text-sm text-muted-foreground">Languages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">99.9%</p>
                <p className="text-sm text-muted-foreground">System Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">A+</p>
                <p className="text-sm text-muted-foreground">Security Grade</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">System Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="backup">Backup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Company Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Company Name</Label>
                      <Input defaultValue="MyFrenchDriver" />
                    </div>
                    <div>
                      <Label>Business Address</Label>
                      <Textarea 
                        defaultValue="25 Avenue des Champs-Élysées, 75008 Paris, France"
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Phone Number</Label>
                        <Input defaultValue="+33 1 23 45 67 89" />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input defaultValue="contact@myfrenchdriver.com" />
                      </div>
                    </div>
                    <div>
                      <Label>Website URL</Label>
                      <Input defaultValue="https://myfrenchdriver.com" />
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      <Save className="w-4 h-4 mr-2" />
                      Save Company Info
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">System Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Default Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Timezone</Label>
                      <Select defaultValue="europe-paris">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="europe-paris">Europe/Paris (GMT+1)</SelectItem>
                          <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                          <SelectItem value="america-newyork">America/New_York (GMT-5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Currency</Label>
                      <Select defaultValue="eur">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eur">Euro (€)</SelectItem>
                          <SelectItem value="usd">US Dollar ($)</SelectItem>
                          <SelectItem value="gbp">British Pound (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">Temporarily disable public access</p>
                      </div>
                      <Switch />
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      <Save className="w-4 h-4 mr-2" />
                      Update Preferences
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Email Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries({
                      'New Bookings': 'newBookings',
                      'Payment Updates': 'paymentUpdates',
                      'System Alerts': 'systemAlerts',
                      'Customer Messages': 'customerMessages',
                      'Maintenance Reminders': 'maintenanceReminders',
                      'Weekly Reports': 'weeklyReports'
                    }).map(([label, key]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <Label>{label}</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications for {label.toLowerCase()}
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
                      <Save className="w-4 h-4 mr-2" />
                      Save Notification Settings
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Primary Admin Email</Label>
                      <Input defaultValue="admin@myfrenchdriver.com" />
                    </div>
                    <div>
                      <Label>Backup Admin Email</Label>
                      <Input defaultValue="backup@myfrenchdriver.com" />
                    </div>
                    <div>
                      <Label>Emergency Contact</Label>
                      <Input defaultValue="+33 6 12 34 56 78" />
                    </div>
                    <div>
                      <Label>Customer Service Email</Label>
                      <Input defaultValue="support@myfrenchdriver.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Notification Schedule</Label>
                      <Select defaultValue="immediate">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="hourly">Hourly Digest</SelectItem>
                          <SelectItem value="daily">Daily Summary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      <Save className="w-4 h-4 mr-2" />
                      Update Contacts
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 min</SelectItem>
                          <SelectItem value="30">30 min</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Login Attempt Limit</Label>
                        <p className="text-sm text-muted-foreground">Max failed login attempts</p>
                      </div>
                      <Select defaultValue="5">
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>IP Whitelist</Label>
                        <p className="text-sm text-muted-foreground">Restrict admin access by IP</p>
                      </div>
                      <Switch />
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      <Shield className="w-4 h-4 mr-2" />
                      Update Security
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Password Policy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Minimum Password Length</Label>
                      <Select defaultValue="8">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 characters</SelectItem>
                          <SelectItem value="8">8 characters</SelectItem>
                          <SelectItem value="12">12 characters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Password Requirements</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked id="uppercase" />
                          <Label htmlFor="uppercase">Require uppercase letters</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked id="numbers" />
                          <Label htmlFor="numbers">Require numbers</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked id="symbols" />
                          <Label htmlFor="symbols">Require special characters</Label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>Password Expiration</Label>
                      <Select defaultValue="90">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      <Key className="w-4 h-4 mr-2" />
                      Apply Password Policy
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Credit Cards</Label>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Bank Transfers</Label>
                        <p className="text-sm text-muted-foreground">SEPA transfers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Cash Payments</Label>
                        <p className="text-sm text-muted-foreground">On-site cash</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Corporate Accounts</Label>
                        <p className="text-sm text-muted-foreground">Monthly invoicing</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Update Payment Methods
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Pricing & Fees</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Base Rate (per hour)</Label>
                      <Input defaultValue="45" type="number" />
                    </div>
                    <div>
                      <Label>Airport Transfer Rate</Label>
                      <Input defaultValue="65" type="number" />
                    </div>
                    <div>
                      <Label>Premium Service Surcharge (%)</Label>
                      <Input defaultValue="15" type="number" />
                    </div>
                    <div>
                      <Label>Cancellation Fee</Label>
                      <Input defaultValue="25" type="number" />
                    </div>
                    <div>
                      <Label>Late Night Surcharge (%)</Label>
                      <Input defaultValue="20" type="number" />
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      <Save className="w-4 h-4 mr-2" />
                      Update Pricing
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Admin Users</CardTitle>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Users className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {adminUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                            <span className="text-accent-foreground font-medium text-sm">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <Badge variant={user.role === 'Super Admin' ? 'default' : 'outline'}>
                              {user.role}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              Last login: {user.lastLogin}
                            </p>
                          </div>
                          <Badge 
                            variant={user.status === 'active' ? 'default' : 'secondary'}
                            className={user.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {user.status}
                          </Badge>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:text-destructive"
                            >
                              <AlertTriangle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="backup" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Backup Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Automatic Backups</Label>
                        <p className="text-sm text-muted-foreground">Daily database backups</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <Label>Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Every Hour</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Retention Period</Label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Backup Location</Label>
                      <Select defaultValue="cloud">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cloud">Cloud Storage</SelectItem>
                          <SelectItem value="local">Local Storage</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      <Save className="w-4 h-4 mr-2" />
                      Save Backup Settings
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Manual Backup</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Last Backup</Label>
                      <p className="text-sm text-muted-foreground">
                        January 16, 2024 at 3:00 AM
                      </p>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">Successful</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Backup Size</Label>
                      <p className="text-sm text-muted-foreground">2.3 GB</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <Download className="w-4 h-4 mr-2" />
                        Create Manual Backup
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Restore from Backup
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">Important</span>
                      </div>
                      <p className="text-xs text-yellow-700">
                        Always test backup restoration in a staging environment before applying to production.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}