import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarInitials } from './ui/avatar';
import { 
  Users,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Star,
  Calendar,
  DollarSign,
  TrendingUp
} from 'lucide-react';

export function CustomersDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const customers = [
    {
      id: 'CUST001',
      name: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      phone: '+33 1 23 45 67 89',
      address: '15 Avenue Montaigne, 75008 Paris',
      type: 'vip',
      totalBookings: 24,
      totalSpent: '€2,340',
      lastBooking: '2024-01-15',
      preferredDriver: 'Philippe Martin',
      notes: 'Always requests champagne service. Prefers luxury vehicles.',
      rating: 5.0,
      joinDate: '2023-03-15'
    },
    {
      id: 'CUST002',
      name: 'James Wilson',
      email: 'j.wilson@company.com',
      phone: '+44 20 7946 0958',
      address: 'London, UK (Tourist)',
      type: 'tourist',
      totalBookings: 3,
      totalSpent: '€145',
      lastBooking: '2024-01-15',
      preferredDriver: 'Antoine Moreau',
      notes: 'English-speaking driver required. Interested in historical tours.',
      rating: 4.8,
      joinDate: '2024-01-10'
    },
    {
      id: 'CUST003',
      name: 'Sofia Martinez',
      email: 'sofia.m@gmail.com',
      phone: '+34 91 123 45 67',
      address: 'Madrid, Spain',
      type: 'regular',
      totalBookings: 8,
      totalSpent: '€650',
      lastBooking: '2024-01-14',
      preferredDriver: 'Julien Leroy',
      notes: 'Frequently books day trips to Versailles. Spanish speaking preferred.',
      rating: 4.9,
      joinDate: '2023-09-22'
    },
    {
      id: 'CUST004',
      name: 'Michael Chen',
      email: 'mchen@tech.com',
      phone: '+1 555 123 4567',
      address: 'San Francisco, CA, USA',
      type: 'corporate',
      totalBookings: 15,
      totalSpent: '€1,200',
      lastBooking: '2024-01-16',
      preferredDriver: 'Philippe Martin',
      notes: 'Corporate account. Always requires receipts and invoices.',
      rating: 4.7,
      joinDate: '2023-06-10'
    },
    {
      id: 'CUST005',
      name: 'Emma Thompson',
      email: 'emma.thompson@email.co.uk',
      phone: '+44 20 1234 5678',
      address: 'London, UK',
      type: 'vip',
      totalBookings: 32,
      totalSpent: '€4,580',
      lastBooking: '2024-01-13',
      preferredDriver: 'Antoine Moreau',
      notes: 'High-value client. Prefers airport transfers in luxury vehicles.',
      rating: 5.0,
      joinDate: '2022-11-05'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vip': return 'bg-accent text-accent-foreground';
      case 'corporate': return 'bg-primary text-primary-foreground';
      case 'tourist': return 'bg-blue-100 text-blue-800';
      case 'regular': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesType = selectedType === 'all' || customer.type === selectedType;
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const stats = {
    total: customers.length,
    vip: customers.filter(c => c.type === 'vip').length,
    corporate: customers.filter(c => c.type === 'corporate').length,
    newThisMonth: customers.filter(c => new Date(c.joinDate) > new Date('2024-01-01')).length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.vip}</p>
                <p className="text-sm text-muted-foreground">VIP Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.corporate}</p>
                <p className="text-sm text-muted-foreground">Corporate Accounts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.newThisMonth}</p>
                <p className="text-sm text-muted-foreground">New This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary">Customer Database</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter customer name" />
                    </div>
                    <div>
                      <Label htmlFor="type">Customer Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular">Regular</SelectItem>
                          <SelectItem value="vip">VIP</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                          <SelectItem value="tourist">Tourist</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="customer@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+33 1 23 45 67 89" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter full address" />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes & Preferences</Label>
                    <Textarea id="notes" placeholder="Any special preferences or notes..." />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-accent hover:bg-accent/90">Add Customer</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search customers..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="tourist">Tourist</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Customer Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statistics</TableHead>
                  <TableHead>Last Booking</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarInitials>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarInitials>
                          <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {customer.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          <span className="truncate max-w-32">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(customer.type)}>
                        {customer.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="font-medium text-primary">{customer.totalBookings}</span> bookings
                        </div>
                        <div className="text-sm text-accent font-medium">
                          {customer.totalSpent} spent
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {customer.lastBooking}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-current" />
                        <span className="text-sm font-medium">{customer.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}