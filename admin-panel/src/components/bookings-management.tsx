import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Calendar,
  Clock,
  MapPin,
  Phone,
  Car,
  CheckCircle,
  Search,
  Edit as EditIcon,
  Trash2,
  Eye,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { bookingService, type Booking } from '../services/api';

export function BookingsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // View state
  const [viewOpen, setViewOpen] = useState(false);
  const [viewBooking, setViewBooking] = useState<Booking | null>(null);

  // Edit state
  const [editOpen, setEditOpen] = useState(false);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    pickup_location: '',
    dropoff_location: '',
    date_time: '', // datetime-local
    booking_status: 'pending' as Booking['booking_status'],
    payment_status: 'pending' as Booking['payment_status'],
    admin_notes: '' as string | undefined,
  });

  // Delete state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteBooking, setDeleteBooking] = useState<Booking | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Add booking state
  const [addOpen, setAddOpen] = useState(false);
  const [addSaving, setAddSaving] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [addForm, setAddForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    pickup_location: '',
    dropoff_location: '',
    date_time: '',
    service_display: 'City Tour',
    flight_number: '',
    train_number: '',
    currency: 'EUR',
    base_price: 0,
    additional_fees: 0,
    additional_info: '',
    admin_notes: '',
  });

  // Load real bookings data from backend
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await bookingService.getAll({ limit: 50 });

      if (response.success && response.data) {
        setBookings(response.data.bookings || []);
      } else {
        setError(response.error || 'Failed to load bookings');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency || 'EUR'
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toDatetimeLocal = (iso: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, '0');
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mi = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  };

  const mapServiceType = (display: string): Booking['service_type'] => {
    const d = display.toLowerCase();
    if (d.includes('airport')) return 'airport_pickup';
    if (d.includes('train')) return 'train_pickup';
    if (d.includes('city')) return 'city_ride';
    return 'other';
  };

  const onViewClick = (b: Booking) => {
    setViewBooking(b);
    setViewOpen(true);
  };

  const onEditClick = (b: Booking) => {
    setEditBooking(b);
    setForm({
      customer_name: b.customer_name || '',
      customer_phone: b.customer_phone || '',
      pickup_location: b.pickup_location || '',
      dropoff_location: b.dropoff_location || '',
      date_time: toDatetimeLocal(b.date_time),
      booking_status: b.booking_status,
      payment_status: b.payment_status,
      admin_notes: b.admin_notes || '',
    });
    setSaveError(null);
    setEditOpen(true);
  };

  const onFormChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, [key]: value as any }));
    setSaveError(null);
  };

  const onSaveEdit = async () => {
    if (!editBooking) return;
    try {
      setSaving(true);
      setSaveError(null);

      // Convert datetime-local back to ISO string
      const iso = form.date_time ? new Date(form.date_time).toISOString() : editBooking.date_time;

      const updates: Partial<Booking> = {
        customer_name: form.customer_name,
        customer_phone: form.customer_phone,
        pickup_location: form.pickup_location,
        dropoff_location: form.dropoff_location,
        date_time: iso,
        booking_status: form.booking_status,
        payment_status: form.payment_status,
        admin_notes: form.admin_notes,
      };

      const id = editBooking._id || (editBooking as any).id;
      const res = await bookingService.update(String(id), updates);
      if (!res.success || !res.data?.booking) {
        setSaveError(res.error || 'Failed to update booking');
        return;
      }

      const updated = res.data.booking;
      setBookings(prev => prev.map(b => (String(b._id || (b as any).id) === String(id) ? (updated as Booking) : b)));
      setEditOpen(false);
      setEditBooking(null);
    } catch (e: any) {
      setSaveError(e?.message || 'Failed to update booking');
    } finally {
      setSaving(false);
    }
  };

  const onCancelClick = (b: Booking) => {
    setDeleteBooking(b);
    setDeleteError(null);
    setConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!deleteBooking) return;
    try {
      setDeleting(true);
      setDeleteError(null);
      const id = deleteBooking._id || (deleteBooking as any).id;
      const res = await bookingService.cancel(String(id));
      if (!res.success) {
        setDeleteError(res.error || 'Failed to cancel booking');
        return;
      }
      setBookings(prev => prev.filter(b => String(b._id || (b as any).id) !== String(id)));
      setConfirmOpen(false);
      setDeleteBooking(null);
    } catch (e: any) {
      setDeleteError(e?.message || 'Failed to cancel booking');
    } finally {
      setDeleting(false);
    }
  };

  // Filter bookings by search
  const displayBookings = bookings.filter(b => {
    const s = searchTerm.trim().toLowerCase();
    if (!s) return true;
    return (
      (b.customer_name || '').toLowerCase().includes(s) ||
      (b.customer_email || '').toLowerCase().includes(s) ||
      (b.customer_phone || '').toLowerCase().includes(s) ||
      (b.pickup_location || '').toLowerCase().includes(s) ||
      (b.dropoff_location || '').toLowerCase().includes(s) ||
      (b.booking_reference || (b as any).id || '').toLowerCase().includes(s) ||
      (b.booking_status || '').toLowerCase().includes(s)
    );
  });

  const confirmedBookings = displayBookings.filter(b => b.booking_status === 'confirmed').length;
  const pendingBookings = displayBookings.filter(b => b.booking_status === 'pending').length;
  const completedBookings = displayBookings.filter(b => b.booking_status === 'completed').length;
  const totalRevenue = displayBookings.reduce((sum, b) => sum + b.total_price, 0);

  const onAddChange = (key: keyof typeof addForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? Number((e.target as HTMLInputElement).value) : e.target.value;
    setAddForm(prev => ({ ...prev, [key]: value as any }));
    setAddError(null);
  };

  const onAddSubmit = async () => {
    try {
      setAddSaving(true);
      setAddError(null);
      if (!addForm.customer_name || !addForm.pickup_location || !addForm.dropoff_location || !addForm.date_time) {
        setAddError('Please fill in required fields: customer, pickup, dropoff, date/time');
        return;
      }
      const payload: any = {
        customer_name: addForm.customer_name,
        customer_email: addForm.customer_email || undefined,
        customer_phone: addForm.customer_phone || undefined,
        pickup_location: addForm.pickup_location,
        dropoff_location: addForm.dropoff_location,
        date_time: new Date(addForm.date_time).toISOString(),
        service_type: mapServiceType(addForm.service_display),
        base_price: Number(addForm.base_price) || 0,
        additional_fees: Number(addForm.additional_fees) || 0,
        total_price: (Number(addForm.base_price) || 0) + (Number(addForm.additional_fees) || 0),
        currency: addForm.currency || 'EUR',
        booking_status: 'pending',
        payment_status: 'pending',
        admin_notes: addForm.admin_notes || undefined,
        flight_number: addForm.flight_number || undefined,
        train_number: addForm.train_number || undefined,
      };
      const extraParts: string[] = [];
      if (addForm.service_display) extraParts.push(`Service: ${addForm.service_display}`);
      if (addForm.flight_number) extraParts.push(`Flight: ${addForm.flight_number}`);
      if (addForm.train_number) extraParts.push(`Train: ${addForm.train_number}`);
      if (addForm.additional_info) extraParts.push(addForm.additional_info);
      if (extraParts.length) payload.special_requirements = extraParts.join(' | ');
      // We use update endpoint design; for creation, the backend likely has POST /bookings;
      // If not available, this will need backend support. Here we attempt POST by calling fetch directly.
      const res = await fetch(`${(import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api'}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem('admin_token') ? { Authorization: `Bearer ${localStorage.getItem('admin_token')}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Failed to create booking');
      }
      const data = await res.json();
      const newBooking = (data.booking || data) as Booking;
      setBookings(prev => [newBooking, ...prev]);
      setAddOpen(false);
    } catch (e: any) {
      setAddError(e?.message || 'Failed to create booking');
    } finally {
      setAddSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <p>Loading bookings...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-red-800 font-medium">Error loading bookings</p>
            <p className="text-red-600 text-sm">{error}</p>
            <Button 
              onClick={loadBookings} 
              variant="outline" 
              className="mt-3"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{displayBookings.length}</p>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{pendingBookings}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{confirmedBookings}</p>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
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
                  <p className="text-2xl font-bold text-primary">€{totalRevenue}</p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bookings Table */}
      {!loading && (
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Booking Management</CardTitle>
            <p className="text-sm text-muted-foreground">
              Showing {displayBookings.length} bookings - {confirmedBookings} confirmed, {pendingBookings} pending, {completedBookings} completed
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search bookings..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={loadBookings} variant="outline" size="sm">
                  <Loader2 className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={() => { setAddOpen(true); setAddError(null); }}>
                  + Add Booking
                </Button>
              </div>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Special Requests</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    displayBookings.map((booking) => (
                      <TableRow key={booking._id || (booking as any).id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.customer_name}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              {booking.customer_phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="truncate max-w-32">{booking.pickup_location}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              → {booking.dropoff_location}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              {formatDate(booking.date_time)}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {formatTime(booking.date_time)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.booking_status)}>
                            {booking.booking_status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-accent">
                          {formatPrice(booking.total_price, booking.currency)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground max-w-48 truncate">
                            {booking.special_requirements || booking.admin_notes || booking.driver_notes || '-'}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" title="View Details" onClick={() => onViewClick(booking)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Edit Booking" onClick={() => onEditClick(booking)}>
                              <EditIcon className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" title="Cancel Booking" onClick={() => onCancelClick(booking)}>
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
      )}

      {/* View Dialog */}
      <Dialog open={viewOpen} onOpenChange={(open) => { setViewOpen(open); if (!open) setViewBooking(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>Read-only details for the selected booking.</DialogDescription>
          </DialogHeader>
          {viewBooking && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              <div>
                <Label>Customer</Label>
                <div className="text-sm">{viewBooking.customer_name}</div>
                <div className="text-xs text-muted-foreground">{viewBooking.customer_phone} {viewBooking.customer_email ? `• ${viewBooking.customer_email}` : ''}</div>
              </div>
              <div>
                <Label>Date & Time</Label>
                <div className="text-sm">{formatDate(viewBooking.date_time)} {formatTime(viewBooking.date_time)}</div>
              </div>
              <div className="md:col-span-2">
                <Label>Route</Label>
                <div className="text-sm">{viewBooking.pickup_location} → {viewBooking.dropoff_location}</div>
              </div>
              <div>
                <Label>Status</Label>
                <div className="text-sm capitalize">{viewBooking.booking_status.replace('_',' ')}</div>
              </div>
              <div>
                <Label>Payment</Label>
                <div className="text-sm capitalize">{viewBooking.payment_status.replace('_',' ')}</div>
              </div>
              <div>
                <Label>Price</Label>
                <div className="text-sm">{formatPrice(viewBooking.total_price, viewBooking.currency)}</div>
              </div>
              <div className="md:col-span-2">
                <Label>Notes</Label>
                <div className="text-sm text-muted-foreground whitespace-pre-line">
                  {viewBooking.admin_notes || viewBooking.driver_notes || viewBooking.special_requirements || '-'}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={(open) => { setEditOpen(open); if (!open) setEditBooking(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>Update the booking details and save to apply changes.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div>
              <Label>Customer Name</Label>
              <Input value={form.customer_name} onChange={onFormChange('customer_name')} />
            </div>
            <div>
              <Label>Customer Phone</Label>
              <Input value={form.customer_phone} onChange={onFormChange('customer_phone')} />
            </div>
            <div className="md:col-span-2">
              <Label>Pickup Location</Label>
              <Input value={form.pickup_location} onChange={onFormChange('pickup_location')} />
            </div>
            <div className="md:col-span-2">
              <Label>Dropoff Location</Label>
              <Input value={form.dropoff_location} onChange={onFormChange('dropoff_location')} />
            </div>
            <div>
              <Label>Date & Time</Label>
              <Input type="datetime-local" value={form.date_time} onChange={onFormChange('date_time')} />
            </div>
            <div>
              <Label>Booking Status</Label>
              <select
                className="border rounded-md h-10 px-3 w-full bg-background"
                value={form.booking_status}
                onChange={onFormChange('booking_status')}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <Label>Payment Status</Label>
              <select
                className="border rounded-md h-10 px-3 w-full bg-background"
                value={form.payment_status}
                onChange={onFormChange('payment_status')}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <Label>Admin Notes</Label>
              <Textarea value={form.admin_notes} onChange={onFormChange('admin_notes')} rows={3} />
            </div>
          </div>
          {saveError && (
            <p className="text-sm text-red-600">{saveError}</p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} disabled={saving}>Cancel</Button>
            <Button onClick={onSaveEdit} disabled={saving}>
              {saving ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</>) : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Booking Dialog */}
      <Dialog open={addOpen} onOpenChange={(open) => setAddOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Booking</DialogTitle>
            <DialogDescription>Create a booking manually.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div>
              <Label>Customer Name</Label>
              <Input value={addForm.customer_name} onChange={onAddChange('customer_name')} />
            </div>
            <div>
              <Label>Customer Email</Label>
              <Input type="email" value={addForm.customer_email} onChange={onAddChange('customer_email')} />
            </div>
            <div>
              <Label>Customer Phone</Label>
              <Input value={addForm.customer_phone} onChange={onAddChange('customer_phone')} />
            </div>
            <div className="md:col-span-2">
              <Label>Pickup Location</Label>
              <Input value={addForm.pickup_location} onChange={onAddChange('pickup_location')} />
            </div>
            <div className="md:col-span-2">
              <Label>Dropoff Location</Label>
              <Input value={addForm.dropoff_location} onChange={onAddChange('dropoff_location')} />
            </div>
            <div>
              <Label>Date & Time</Label>
              <Input type="datetime-local" value={addForm.date_time} onChange={onAddChange('date_time')} />
            </div>
            <div>
              <Label>Service Type</Label>
              <select className="border rounded-md h-10 px-3 w-full bg-background" value={addForm.service_display} onChange={onAddChange('service_display')}>
                <option>City Tour</option>
                <option>Airport Transfer</option>
                <option>Train Transfer</option>
                <option>VIP Service</option>
                <option>Diplomacy</option>
                <option>Corporate</option>
                <option>Business</option>
                <option>Group Transportation</option>
                <option>Private Transportation</option>
                <option>Other Transfers</option>
                <option>Long Distance</option>
                <option>Disneyland Transfers</option>
                <option>Ski Resorts</option>
                <option>Medical Tourism</option>
                <option>Close Protection</option>
                <option>Service 24/7</option>
                <option>Wedding</option>
                <option>VIP Protection</option>
                <option>Brand & Events</option>
              </select>
            </div>
            <div>
              <Label>Flight Number (if applicable)</Label>
              <Input value={addForm.flight_number} onChange={onAddChange('flight_number')} placeholder="e.g. AF123" />
            </div>
            <div>
              <Label>Train Number (if applicable)</Label>
              <Input value={addForm.train_number} onChange={onAddChange('train_number')} placeholder="e.g. TGV 6789" />
            </div>
            <div>
              <Label>Base Price</Label>
              <Input type="number" step="0.01" value={addForm.base_price} onChange={onAddChange('base_price')} />
            </div>
            <div>
              <Label>Additional Fees</Label>
              <Input type="number" step="0.01" value={addForm.additional_fees} onChange={onAddChange('additional_fees')} />
            </div>
            <div>
              <Label>Currency</Label>
              <Input value={addForm.currency} onChange={onAddChange('currency')} />
            </div>
            <div className="md:col-span-2">
              <Label>Additional Info</Label>
              <Textarea value={addForm.additional_info} onChange={onAddChange('additional_info')} rows={3} placeholder="Any special requirements, preferences, pax details, luggage, etc." />
            </div>
            <div className="md:col-span-2">
              <Label>Admin Notes</Label>
              <Textarea value={addForm.admin_notes} onChange={onAddChange('admin_notes')} rows={3} />
            </div>
          </div>
          {addError && <p className="text-sm text-red-600">{addError}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)} disabled={addSaving}>Cancel</Button>
            <Button onClick={onAddSubmit} disabled={addSaving}>
              {addSaving ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</>) : 'Create Booking'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={(open) => { setConfirmOpen(open); if (!open) setDeleteBooking(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              {deleteBooking ? (
                <>
                  Are you sure you want to cancel the booking for <span className="font-medium">{deleteBooking.customer_name}</span> on {formatDate(deleteBooking.date_time)} {formatTime(deleteBooking.date_time)}?
                </>
              ) : (
                'Are you sure you want to cancel this booking?'
              )}
            </DialogDescription>
          </DialogHeader>
          {deleteError && (
            <p className="text-sm text-red-600">{deleteError}</p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)} disabled={deleting}>No, Keep</Button>
            <Button className="bg-destructive hover:bg-destructive/90" onClick={onConfirmDelete} disabled={deleting}>
              {deleting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Cancelling...</>) : 'Yes, Cancel'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}