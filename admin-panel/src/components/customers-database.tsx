import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
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
  TrendingUp,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { bookingService, type Booking } from '../services/api';

// Define Customer type locally since we're generating it from bookings
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'frequent' | 'business' | 'tourist' | 'regular';
  totalBookings: number;
  totalSpent: number;
  lastBooking: string;
  firstBooking: string;
  notes: string;
}

export function CustomersDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load customers and bookings data from backend
  useEffect(() => {
    loadCustomersData();
  }, []);

  const loadCustomersData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Loading customers from backend...');

      // Check authentication
      const token = localStorage.getItem('admin_token');
      console.log('🔑 Auth token exists:', !!token);

      // Load all bookings to calculate customer statistics
      console.log('📞 Calling bookingService.getAll...');
      const bookingsResponse = await bookingService.getAll({ limit: 50 });
      console.log('📋 Bookings API Response:', bookingsResponse);
      
      if (bookingsResponse.success && bookingsResponse.data) {
        const dataAny = bookingsResponse.data as any;
        const bookingsData: Booking[] = (dataAny && (dataAny.bookings || dataAny.items)) || [];
        setBookings(bookingsData);
        console.log('✅ Loaded bookings for customer analysis:', bookingsData.length);
        
        if (bookingsData.length > 0) {
          // Generate customer data from bookings
          const customerData = generateCustomersFromBookings(bookingsData);
          setCustomers(customerData);
          console.log('👥 Generated customers:', customerData.length);
        } else {
          setCustomers([]);
          console.log('ℹ️ No bookings found, no customers to generate');
        }
      } else {
        const errorMsg = bookingsResponse.error || 'Failed to load customer data';
        setError(errorMsg);
        console.error('❌ Failed to load bookings:', errorMsg);
        console.error('❌ Full response:', bookingsResponse);
      }
    } catch (err) {
      const errorMsg = 'Network error. Please check your connection.';
      setError(errorMsg);
      console.error('💥 Load customers error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generate customer data from booking records with defensive checks
  const generateCustomersFromBookings = (bookings: Booking[]) => {
    const customerMap = new Map<string, Customer>();

    const safeBookings = (bookings || []).filter((b: any) => {
      const hasAnyId = b && (b.customer_name || b.customer_email || b.customer_phone);
      const hasDate = b && (b.date_time || b.created_at);
      const hasPrice = b && (typeof b.total_price === 'number' || !isNaN(Number(b.total_price)));
      return hasAnyId && hasDate && hasPrice;
    });

    safeBookings.forEach((booking: any) => {
      const name = booking.customer_name || booking.customer_email || 'Unknown Customer';
      const phone = booking.customer_phone || 'N/A';
      const email = booking.customer_email || (typeof name === 'string' ? `${name.toLowerCase().replace(/\s+/g, '.')}@email.com` : 'customer@email.com');
      const dateStr: string = booking.date_time || booking.created_at;
      const priceNum: number = typeof booking.total_price === 'number' ? booking.total_price : Number(booking.total_price) || 0;

      const key = `${name}-${phone}`;

      if (customerMap.has(key)) {
        const existing = customerMap.get(key)!;
        const isNewer = new Date(dateStr) > new Date(existing.lastBooking);
        const isOlder = new Date(dateStr) < new Date(existing.firstBooking);
        customerMap.set(key, {
          ...existing,
          totalBookings: existing.totalBookings + 1,
          totalSpent: existing.totalSpent + priceNum,
          lastBooking: isNewer ? dateStr : existing.lastBooking,
          firstBooking: isOlder ? dateStr : existing.firstBooking,
          // Keep earliest note if exists, otherwise use current booking notes
          notes: existing.notes || booking.special_requirements || booking.admin_notes || booking.driver_notes || ''
        });
      } else {
        customerMap.set(key, {
          id: `CUST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name,
          email,
          phone,
          type: determineCustomerType(1, priceNum),
          totalBookings: 1,
          totalSpent: priceNum,
          lastBooking: dateStr,
          firstBooking: dateStr,
          notes: booking.special_requirements || booking.admin_notes || booking.driver_notes || ''
        });
      }
    });

    // Update customer types based on final booking counts
    const customers: Customer[] = Array.from(customerMap.values()).map((customer) => ({
      ...customer,
      type: determineCustomerType(customer.totalBookings, customer.totalSpent),
    }));

    return customers.sort((a, b) => b.totalBookings - a.totalBookings);
  };

  // Determine customer type based on booking history
  const determineCustomerType = (bookingCount: number, totalSpent: number) => {
    if (bookingCount >= 5 || totalSpent >= 500) return 'frequent';
    if (totalSpent >= 200) return 'business';
    if (bookingCount === 1) return 'tourist';
    return 'regular';
  };

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    try {
      return date.toLocaleDateString('en-GB');
    } catch {
      return '-';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'frequent': return 'bg-accent text-accent-foreground';
      case 'business': return 'bg-primary text-primary-foreground';
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
    frequent: customers.filter(c => c.type === 'frequent').length,
    business: customers.filter(c => c.type === 'business').length,
    newThisMonth: customers.filter(c => new Date(c.firstBooking) > new Date('2024-01-01')).length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p>Loading customers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <p className="text-red-800 font-medium">Error loading customers</p>
          <p className="text-red-600 text-sm">{error}</p>
          <Button 
            onClick={loadCustomersData} 
            variant="outline" 
            className="mt-3"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
                <p className="text-2xl font-bold text-primary">{stats.frequent}</p>
                <p className="text-sm text-muted-foreground">Frequent Customers</p>
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
                <p className="text-2xl font-bold text-primary">{stats.business}</p>
                <p className="text-sm text-muted-foreground">Business Travelers</p>
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
                <SelectItem value="frequent">Frequent</SelectItem>
                <SelectItem value="business">Business</SelectItem>
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
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">ID: {customer.id.slice(-8)}</p>
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
                          {customer.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="font-medium text-primary">{customer.totalBookings}</span> booking{customer.totalBookings !== 1 ? 's' : ''}
                          </div>
                          <div className="text-sm text-accent font-medium">
                            {formatCurrency(customer.totalSpent)} spent
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          {formatDate(customer.lastBooking)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground max-w-48 truncate">
                          {customer.notes}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" title="View Details">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Edit Customer">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" title="Delete Customer">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}