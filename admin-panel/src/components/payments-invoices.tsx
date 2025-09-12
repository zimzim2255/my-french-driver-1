import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { 
  DollarSign,
  CreditCard,
  Receipt,
  Download,
  Eye,
  Send,
  Plus,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2
} from 'lucide-react';
import { bookingService, dashboardService, type Booking } from '../services/api';
import jsPDF from 'jspdf';

interface PaymentData {
  id: string;
  bookingId: string;
  customer: string;
  amount: string;
  method: string;
  status: string;
  date: string;
  description: string;
}


interface PaymentStats {
  totalRevenue: string;
  monthlyGrowth: string;
  pendingPayments: string;
}

// Brand colors for PDFs - Gold, Black, White theme
const BRAND = {
  primary: '#000000', // black
  accent: '#FFD700',  // gold
  text: '#000000',    // black
  muted: '#666666',   // dark gray
  white: '#FFFFFF'    // white
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

async function loadLogoDataUrl(): Promise<string | null> {
  // Try multiple logo paths - admin panel needs to access main site assets
  const candidates = [
    '../src/assets/logo.png',
    '../../src/assets/logo.png', 
    '/src/assets/logo.png',
    '/assets/logo.png',
    '/logo.png',
    'https://raw.githubusercontent.com/yourusername/my-french-driver-site/main/src/assets/logo.png'
  ];
  
  console.log('🔍 Attempting to load logo from multiple sources...');
  
  for (const url of candidates) {
    try {
      console.log(`📡 Trying to fetch logo from: ${url}`);
      const res = await fetch(url, { 
        cache: 'no-cache',
        mode: 'cors'
      });
      
      if (!res.ok) {
        console.log(`❌ Failed to fetch from ${url}: ${res.status} ${res.statusText}`);
        continue;
      }
      
      const blob = await res.blob();
      if (!blob.type.startsWith('image')) {
        console.log(`❌ Invalid image type from ${url}: ${blob.type}`);
        continue;
      }
      
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      
      console.log(`✅ Successfully loaded logo from: ${url}`);
      return dataUrl;
    } catch (e) {
      console.log(`❌ Error loading from ${url}:`, e);
    }
  }
  
  console.log('❌ Failed to load logo from all sources');
  return null;
}

function drawHeader(doc: jsPDF, title: string, logoDataUrl: string | null) {
  const black = hexToRgb(BRAND.primary);
  const gold = hexToRgb(BRAND.accent);
  
  // White header background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Gold accent line
  doc.setFillColor(gold.r, gold.g, gold.b);
  doc.rect(0, 35, 210, 5, 'F');

  // Logo
  if (logoDataUrl) {
    try {
      doc.addImage(logoDataUrl, 'PNG', 15, 8, 24, 24);
    } catch (error) {
      console.log('Logo loading failed:', error);
    }
  }

  // Company name in black
  doc.setTextColor(black.r, black.g, black.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('MY FRENCH DRIVER', 45, 18);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Professional Transportation Services', 45, 26);

  // Title in gold
  doc.setTextColor(gold.r, gold.g, gold.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(title, 195, 20, { align: 'right' as any });
}

function drawFooter(doc: jsPDF) {
  const black = hexToRgb(BRAND.primary);
  const gold = hexToRgb(BRAND.accent);
  
  // Gold line above footer
  doc.setFillColor(gold.r, gold.g, gold.b);
  doc.rect(15, 275, 180, 1, 'F');
  
  // Footer text in black
  doc.setTextColor(black.r, black.g, black.b);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Thank you for choosing My French Driver', 105, 282, { align: 'center' as any });
  doc.setFontSize(9);
  doc.text('info@myfrenchdriver.com • www.myfrenchdriver.com', 105, 288, { align: 'center' as any });
}

// Helper function to clean and format location strings
function cleanLocationString(location: string): string {
  if (!location) return 'Unknown Location';
  
  try {
    // First, try to decode if it's URL encoded
    let cleaned = decodeURIComponent(location);
    
    // Handle common encoding issues
    cleaned = cleaned
      .replace(/þ/g, '') // Remove þ characters
      .replace(/[^\w\s,.-]/g, '') // Remove other special characters except common punctuation
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
    
    // If the string is still messy or empty, extract meaningful parts
    if (cleaned.length < 3 || /^[^a-zA-Z]*$/.test(cleaned)) {
      // Try to extract city/country information from common patterns
      const parts = location.split(',').map(part => part.trim());
      const meaningfulParts = parts.filter(part => 
        part.length > 2 && 
        /[a-zA-Z]/.test(part) && 
        !part.includes('þ')
      );
      
      if (meaningfulParts.length > 0) {
        // Take the first meaningful part (usually city name)
        cleaned = meaningfulParts[0];
      } else {
        // Fallback to a generic description
        cleaned = 'Location';
      }
    }
    
    // Capitalize first letter
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    
    return cleaned;
  } catch (error) {
    console.warn('Error cleaning location string:', error);
    return 'Location';
  }
}

// Helper function to build route description with extra stops
function buildRouteDescription(booking: Booking): string {
  const pickup = cleanLocationString(booking.pickup_location);
  const dropoff = cleanLocationString(booking.dropoff_location);
  
  // Check if there are extra stops in special requirements
  const extraStopsMatch = booking.special_requirements?.match(/Extra stops?: ([^.]+)/i);
  if (extraStopsMatch) {
    const extraStopsText = extraStopsMatch[1].trim();
    const extraStops = extraStopsText.split(',').map(stop => cleanLocationString(stop.trim()));
    
    if (extraStops.length > 0 && extraStops[0] !== 'Location') {
      // Build route with extra stops: A → B → C → D
      return `${pickup} → ${extraStops.join(' → ')} → ${dropoff}`;
    }
  }
  
  // Default route without extra stops
  return `${pickup} → ${dropoff}`;
}

export function PaymentsInvoices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<PaymentData[]>([]);
    const [stats, setStats] = useState<PaymentStats>({
    totalRevenue: '€0',
    monthlyGrowth: '0%',
    pendingPayments: '€0'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  
  // Modal states
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentData | null>(null);
  const [newPaymentData, setNewPaymentData] = useState({
    bookingId: '',
    customer: '',
    amount: '',
    method: 'Credit Card',
    status: 'completed',
    description: ''
  });

  // Load real data from API
  useEffect(() => {
    const loadPaymentData = async () => {
      try {
        setLoading(true);
        setError('');

        console.log('📞 Loading payment data from API...');
        
        // Load all bookings to generate payment data
        const bookingsResponse = await bookingService.getAll({ limit: 100 });
        console.log('📋 Bookings API Response:', bookingsResponse);

        if (bookingsResponse.success && bookingsResponse.data) {
          const bookingsData: Booking[] = bookingsResponse.data.bookings || [];
          setBookings(bookingsData);
          console.log('✅ Loaded bookings:', bookingsData.length);

          // Generate payment data from bookings
          const paymentData = generatePaymentsFromBookings(bookingsData);
          const statsData = calculatePaymentStats(bookingsData);

          setPayments(paymentData);
          setStats(statsData);

          console.log('✅ Generated payments:', paymentData.length);
          console.log('�� Calculated stats:', statsData);
        } else {
          const errorMsg = bookingsResponse.error || 'Failed to load payment data';
          setError(errorMsg);
          console.error('❌ Failed to load bookings:', errorMsg);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'An error occurred while loading payment data';
        setError(errorMsg);
        console.error('❌ Payment data loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPaymentData();
  }, []);

  // Generate payment data from bookings
  const generatePaymentsFromBookings = (bookings: Booking[]): PaymentData[] => {
    return bookings.map((booking, index) => {
      // Extract payment method from special requirements or default to Credit Card
      let paymentMethod = 'Credit Card';
      if (booking.special_requirements) {
        if (booking.special_requirements.includes('Payment ID:')) {
          paymentMethod = 'Stripe';
        } else if (booking.special_requirements.toLowerCase().includes('cash')) {
          paymentMethod = 'Cash';
        } else if (booking.special_requirements.toLowerCase().includes('bank')) {
          paymentMethod = 'Bank Transfer';
        }
      }

      return {
        id: `PAY${String(index + 1).padStart(3, '0')}`,
        bookingId: booking.booking_reference || booking._id.substring(0, 8),
        customer: booking.customer_name,
        amount: `€${booking.total_price.toFixed(2)}`,
        method: paymentMethod,
        status: booking.payment_status === 'paid' ? 'completed' : 
                booking.payment_status === 'pending' ? 'pending' : 
                booking.payment_status === 'failed' ? 'failed' : 'pending',
        date: new Date(booking.created_at).toLocaleDateString('en-GB'),
        description: buildRouteDescription(booking)
      };
    });
  };

  
  // Calculate payment statistics
  const calculatePaymentStats = (bookings: Booking[]): PaymentStats => {
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.total_price, 0);
    const pendingPayments = bookings
      .filter(booking => booking.payment_status === 'pending')
      .reduce((sum, booking) => sum + booking.total_price, 0);
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthBookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.created_at);
      return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
    });
    
    const lastMonthBookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.created_at);
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return bookingDate.getMonth() === lastMonth && bookingDate.getFullYear() === lastMonthYear;
    });

    const thisMonthRevenue = thisMonthBookings.reduce((sum, booking) => sum + booking.total_price, 0);
    const lastMonthRevenue = lastMonthBookings.reduce((sum, booking) => sum + booking.total_price, 0);
    
    const growthRate = lastMonthRevenue > 0 
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100)
      : 0;

    return {
      totalRevenue: `€${totalRevenue.toFixed(2)}`,
      monthlyGrowth: `${growthRate >= 0 ? '+' : ''}${growthRate.toFixed(1)}%`,
      pendingPayments: `€${pendingPayments.toFixed(2)}`
    };
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-accent text-accent-foreground';
      case 'failed': return 'bg-destructive text-destructive-foreground';
      case 'invoiced': return 'bg-blue-100 text-blue-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  
  // Handler functions
  const handleRecordPayment = () => {
    // Add new payment to the list
    const newPayment: PaymentData = {
      id: `PAY${String(payments.length + 1).padStart(3, '0')}`,
      bookingId: newPaymentData.bookingId,
      customer: newPaymentData.customer,
      amount: newPaymentData.amount.startsWith('€') ? newPaymentData.amount : `€${newPaymentData.amount}`,
      method: newPaymentData.method,
      status: newPaymentData.status,
      date: new Date().toLocaleDateString('en-GB'),
      description: newPaymentData.description
    };

    setPayments([...payments, newPayment]);
    setShowRecordPaymentModal(false);
    
    // Reset form
    setNewPaymentData({
      bookingId: '',
      customer: '',
      amount: '',
      method: 'Credit Card',
      status: 'completed',
      description: ''
    });

    console.log('✅ New payment recorded:', newPayment);
  };

  const handleViewPayment = (payment: PaymentData) => {
    setSelectedPayment(payment);
    setShowPaymentDetailsModal(true);
  };

  const handleDownloadReceipt = async (payment: PaymentData) => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const logo = await loadLogoDataUrl();
    const black = hexToRgb(BRAND.primary);
    const gold = hexToRgb(BRAND.accent);
    const gray = hexToRgb(BRAND.muted);

    drawHeader(doc, 'PAYMENT RECEIPT', logo);

    const startY = 50;
    
    // Find the corresponding booking for additional details
    const correspondingBooking = bookings.find(booking => 
      (booking.booking_reference && booking.booking_reference === payment.bookingId) ||
      booking._id.substring(0, 8) === payment.bookingId
    );
    
    // Receipt Information Table
    doc.setFillColor(black.r, black.g, black.b);
    doc.rect(15, startY, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('RECEIPT INFORMATION', 20, startY + 5.5);

    // Table rows with alternating colors
    const rows = [
      ['Receipt ID:', payment.id],
      ['Date:', payment.date],
      ['Status:', payment.status.toUpperCase()],
      ['Customer:', payment.customer],
      ['Booking Reference:', payment.bookingId]
    ];

    let currentY = startY + 8;
    rows.forEach((row, index) => {
      // Alternating row colors
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(15, currentY, 180, 8, 'F');
      }
      
      doc.setTextColor(black.r, black.g, black.b);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(row[0], 20, currentY + 5.5);
      
      doc.setFont('helvetica', 'normal');
      doc.text(row[1], 80, currentY + 5.5);
      
      currentY += 8;
    });

    // Service Details Table
    currentY += 10;
    doc.setFillColor(black.r, black.g, black.b);
    doc.rect(15, currentY, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('SERVICE DETAILS', 20, currentY + 5.5);

    // Build service details from booking data
    const serviceDetails = [];
    
    if (correspondingBooking) {
      // Clean pickup location
      const cleanPickup = cleanLocationString(correspondingBooking.pickup_location);
      serviceDetails.push(['Pickup Location:', cleanPickup]);
      
      // Clean dropoff location  
      const cleanDropoff = cleanLocationString(correspondingBooking.dropoff_location);
      serviceDetails.push(['Dropoff Location:', cleanDropoff]);
      
      // Extra stops if available
      const extraStopsMatch = correspondingBooking.special_requirements?.match(/Extra stops?: ([^.]+)/i);
      if (extraStopsMatch) {
        const extraStopsText = extraStopsMatch[1].trim();
        const extraStops = extraStopsText.split(',').map(stop => cleanLocationString(stop.trim()));
        if (extraStops.length > 0 && extraStops[0] !== 'Location') {
          serviceDetails.push(['Extra Stops:', extraStops.join(', ')]);
        }
      }
      
      // Passengers count - try to extract from special requirements or default
      const passengersMatch = correspondingBooking.special_requirements?.match(/(\d+)\s+passenger/i);
      if (passengersMatch) {
        serviceDetails.push(['Passengers:', `${passengersMatch[1]} passenger${parseInt(passengersMatch[1]) > 1 ? 's' : ''}`]);
      } else {
        serviceDetails.push(['Passengers:', '1 passenger']); // Default fallback
      }
      
      // Service type if available
      const serviceTypeMatch = correspondingBooking.special_requirements?.match(/Service Type: ([^.]+)/i);
      if (serviceTypeMatch) {
        const serviceTypeName = serviceTypeMatch[1].trim();
        serviceDetails.push(['Service Type:', serviceTypeName]);
      } else if (correspondingBooking.service_type && correspondingBooking.service_type !== 'city_ride') {
        const serviceTypeNames: Record<string, string> = {
          'airport_pickup': 'Airport Transfers',
          'train_pickup': 'Train Station Transfers',
          'other': 'Other Services'
        };
        serviceDetails.push(['Service Type:', serviceTypeNames[correspondingBooking.service_type] || correspondingBooking.service_type]);
      }
      
      // Vehicle info
      const vehicleMatch = correspondingBooking.special_requirements?.match(/Vehicle: ([^.]+)/i);
      if (vehicleMatch) {
        serviceDetails.push(['Vehicle:', vehicleMatch[1].trim()]);
      }
      
      // Travel type and related info
      if (correspondingBooking.flight_number) {
        serviceDetails.push(['Travel Type:', 'Flight']);
        serviceDetails.push(['Flight Number:', correspondingBooking.flight_number]);
      } else if (correspondingBooking.train_number) {
        serviceDetails.push(['Travel Type:', 'Train']);
        serviceDetails.push(['Train Number:', correspondingBooking.train_number]);
      }
      
      // Terminal info
      const terminalMatch = correspondingBooking.special_requirements?.match(/Terminal: ([^.]+)/i);
      if (terminalMatch) {
        serviceDetails.push(['Terminal:', terminalMatch[1].trim()]);
      }
      
      // Distance only (remove duration as requested)
      const distanceMatch = correspondingBooking.special_requirements?.match(/Distance: ([^.]+)/i);
      if (distanceMatch) {
        serviceDetails.push(['Distance:', distanceMatch[1].trim()]);
      }
    } else {
      // Fallback if no booking found
      serviceDetails.push(['Route:', payment.description || 'Transportation service']);
    }

    // Render service details
    currentY += 8;
    serviceDetails.forEach((detail, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(15, currentY, 180, 8, 'F');
      }
      
      doc.setTextColor(black.r, black.g, black.b);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(detail[0], 20, currentY + 5.5);
      
      doc.setFont('helvetica', 'normal');
      doc.text(detail[1], 80, currentY + 5.5, { maxWidth: 110 } as any);
      
      currentY += 8;
    });

    // Special Requirements Section (if any)
    if (correspondingBooking?.special_requirements) {
      // Extract user special requirements (not system-generated info)
      const specialReqs = correspondingBooking.special_requirements
        .split('. ')
        .filter(req => 
          !req.includes('Vehicle:') && 
          !req.includes('Distance:') && 
          !req.includes('Duration:') && 
          !req.includes('Payment ID:') &&
          !req.includes('Terminal:') &&
          !req.includes('Extra stops:') &&
          !req.includes('Service Type:') &&
          req.trim().length > 0
        )
        .join('. ');
      
      if (specialReqs) {
        currentY += 10;
        doc.setFillColor(black.r, black.g, black.b);
        doc.rect(15, currentY, 180, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('SPECIAL REQUIREMENTS', 20, currentY + 5.5);

        currentY += 8;
        doc.setFillColor(250, 250, 250);
        doc.rect(15, currentY, 180, 16, 'F');
        doc.setTextColor(black.r, black.g, black.b);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(specialReqs, 20, currentY + 6, { maxWidth: 170 } as any);
        currentY += 16;
      }
    }

    // Payment Method Table
    currentY += 10;
    doc.setFillColor(black.r, black.g, black.b);
    doc.rect(15, currentY, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('PAYMENT METHOD', 20, currentY + 5.5);

    currentY += 8;
    doc.setFillColor(250, 250, 250);
    doc.rect(15, currentY, 180, 8, 'F');
    doc.setTextColor(black.r, black.g, black.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Method:', 20, currentY + 5.5);
    doc.setFont('helvetica', 'normal');
    doc.text(payment.method, 80, currentY + 5.5);

    // Total Amount - Gold highlight box
    currentY += 20;
    doc.setFillColor(gold.r, gold.g, gold.b);
    doc.rect(15, currentY, 180, 20, 'F');
    doc.setTextColor(black.r, black.g, black.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('TOTAL AMOUNT PAID', 105, currentY + 8, { align: 'center' as any });
    doc.setFontSize(18);
    doc.text(payment.amount, 105, currentY + 16, { align: 'center' as any });

    drawFooter(doc);
    doc.save(`Receipt_${payment.id}_${payment.customer.replace(/\s+/g, '_')}.pdf`);
    console.log('✅ Receipt PDF generated for payment:', payment.id);
  };

  const handleGenerateInvoice = async (payment: PaymentData) => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const logo = await loadLogoDataUrl();
    const black = hexToRgb(BRAND.primary);
    const gold = hexToRgb(BRAND.accent);
    const gray = hexToRgb(BRAND.muted);

    drawHeader(doc, 'INVOICE', logo);

    const startY = 50;
    const invNo = `INV-${new Date().getFullYear()}-${String(payments.indexOf(payment) + 1).padStart(3, '0')}`;
    const issue = new Date().toLocaleDateString('en-GB');
    const due = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB');
    
    // Invoice Information Table
    doc.setFillColor(black.r, black.g, black.b);
    doc.rect(15, startY, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('INVOICE INFORMATION', 20, startY + 5.5);

    // Invoice details rows
    const invoiceRows = [
      ['Invoice Number:', invNo],
      ['Issue Date:', issue],
      ['Due Date:', due],
      ['Payment Terms:', 'Net 30 days']
    ];

    let currentY = startY + 8;
    invoiceRows.forEach((row, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(15, currentY, 180, 8, 'F');
      }
      
      doc.setTextColor(black.r, black.g, black.b);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(row[0], 20, currentY + 5.5);
      
      doc.setFont('helvetica', 'normal');
      doc.text(row[1], 80, currentY + 5.5);
      
      currentY += 8;
    });

    // Bill To Table
    currentY += 10;
    doc.setFillColor(black.r, black.g, black.b);
    doc.rect(15, currentY, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('BILL TO', 20, currentY + 5.5);

    currentY += 8;
    doc.setFillColor(250, 250, 250);
    doc.rect(15, currentY, 180, 16, 'F');
    doc.setTextColor(black.r, black.g, black.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Customer:', 20, currentY + 6);
    doc.setFont('helvetica', 'normal');
    doc.text(payment.customer, 20, currentY + 12);

    // Services Table
    currentY += 26;
    doc.setFillColor(black.r, black.g, black.b);
    doc.rect(15, currentY, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('SERVICES', 20, currentY + 5.5);

    // Service table header
    currentY += 8;
    doc.setFillColor(gold.r, gold.g, gold.b);
    doc.rect(15, currentY, 180, 8, 'F');
    doc.setTextColor(black.r, black.g, black.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Description', 20, currentY + 5.5);
    doc.text('Booking Ref', 100, currentY + 5.5);
    doc.text('Amount', 175, currentY + 5.5, { align: 'right' as any });

    // Service row
    currentY += 8;
    doc.setFillColor(250, 250, 250);
    doc.rect(15, currentY, 180, 12, 'F');
    doc.setTextColor(black.r, black.g, black.b);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(payment.description || 'Transportation service', 20, currentY + 6, { maxWidth: 75 } as any);
    doc.text(payment.bookingId, 100, currentY + 6);
    doc.setFont('helvetica', 'bold');
    doc.text(payment.amount, 175, currentY + 6, { align: 'right' as any });

    // Payment Summary Table
    currentY += 22;
    doc.setFillColor(black.r, black.g, black.b);
    doc.rect(15, currentY, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('PAYMENT SUMMARY', 20, currentY + 5.5);

    // Summary rows
    const summaryRows = [
      ['Subtotal:', payment.amount],
      ['Tax (0%):', '€0.00'],
      ['TOTAL:', payment.amount]
    ];

    currentY += 8;
    summaryRows.forEach((row, index) => {
      if (index === 2) { // Total row - gold background
        doc.setFillColor(gold.r, gold.g, gold.b);
        doc.rect(15, currentY, 180, 8, 'F');
        doc.setTextColor(black.r, black.g, black.b);
        doc.setFont('helvetica', 'bold');
      } else {
        if (index % 2 === 0) {
          doc.setFillColor(250, 250, 250);
          doc.rect(15, currentY, 180, 8, 'F');
        }
        doc.setTextColor(black.r, black.g, black.b);
        doc.setFont('helvetica', 'normal');
      }
      
      doc.setFontSize(10);
      doc.text(row[0], 20, currentY + 5.5);
      doc.setFont('helvetica', 'bold');
      doc.text(row[1], 175, currentY + 5.5, { align: 'right' as any });
      
      currentY += 8;
    });

    // Payment Method Table
    currentY += 10;
    doc.setFillColor(black.r, black.g, black.b);
    doc.rect(15, currentY, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('PAYMENT INFORMATION', 20, currentY + 5.5);

    currentY += 8;
    const paymentRows = [
      ['Payment Method:', payment.method],
      ['Payment Status:', payment.status.toUpperCase()],
      ['Payment Date:', payment.date]
    ];

    paymentRows.forEach((row, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(15, currentY, 180, 8, 'F');
      }
      
      doc.setTextColor(black.r, black.g, black.b);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(row[0], 20, currentY + 5.5);
      
      doc.setFont('helvetica', 'normal');
      doc.text(row[1], 80, currentY + 5.5);
      
      currentY += 8;
    });

    drawFooter(doc);
    doc.save(`Invoice_${payment.bookingId}_${payment.customer.replace(/\s+/g, '_')}.pdf`);
    console.log('✅ Invoice PDF generated for payment:', payment.id);
  };

  // Filter payments based on search and status
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading payment data...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Payment Data</h3>
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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.totalRevenue}</p>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.monthlyGrowth}</p>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.pendingPayments}</p>
                <p className="text-sm text-muted-foreground">Pending Payments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
              </div>

      {/* Payment & Invoice Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Payment & Invoice Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="payments">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="payments" className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search payments..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="invoiced">Invoiced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Dialog open={showRecordPaymentModal} onOpenChange={setShowRecordPaymentModal}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Record Payment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Record New Payment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Booking ID</label>
                        <Input
                          value={newPaymentData.bookingId}
                          onChange={(e) => setNewPaymentData({...newPaymentData, bookingId: e.target.value})}
                          placeholder="e.g. BK001"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Customer Name</label>
                        <Input
                          value={newPaymentData.customer}
                          onChange={(e) => setNewPaymentData({...newPaymentData, customer: e.target.value})}
                          placeholder="Customer name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Amount</label>
                        <Input
                          value={newPaymentData.amount}
                          onChange={(e) => setNewPaymentData({...newPaymentData, amount: e.target.value})}
                          placeholder="e.g. 85.00"
                          type="number"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Payment Method</label>
                        <Select value={newPaymentData.method} onValueChange={(value) => setNewPaymentData({...newPaymentData, method: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Credit Card">Credit Card</SelectItem>
                            <SelectItem value="Stripe">Stripe</SelectItem>
                            <SelectItem value="Cash">Cash</SelectItem>
                            <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                            <SelectItem value="Corporate Account">Corporate Account</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Status</label>
                        <Select value={newPaymentData.status} onValueChange={(value) => setNewPaymentData({...newPaymentData, status: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Input
                          value={newPaymentData.description}
                          onChange={(e) => setNewPaymentData({...newPaymentData, description: e.target.value})}
                          placeholder="e.g. CDG Airport → Hotel Plaza"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowRecordPaymentModal(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleRecordPayment} className="bg-primary hover:bg-primary/90">
                        Record Payment
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Booking</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.length > 0 ? (
                      filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.customer}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{payment.bookingId}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-40">
                                {payment.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-accent">{payment.amount}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              {payment.method}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              {payment.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPaymentStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewPayment(payment)}
                                title="View Payment Details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDownloadReceipt(payment)}
                                title="Download Receipt"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          <div className="flex flex-col items-center gap-2">
                            <DollarSign className="w-8 h-8 text-muted-foreground" />
                            <p className="text-muted-foreground">No payments found</p>
                            <p className="text-sm text-muted-foreground">
                              {payments.length === 0 ? 'No bookings with payments yet' : 'Try adjusting your search or filters'}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

                      </Tabs>
        </CardContent>
      </Card>

      {/* Payment Details Modal */}
      <Dialog open={showPaymentDetailsModal} onOpenChange={setShowPaymentDetailsModal}>
        <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              Payment Details
            </DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6">
              {/* Find corresponding booking for detailed info */}
              {(() => {
                const correspondingBooking = bookings.find(booking => 
                  (booking.booking_reference && booking.booking_reference === selectedPayment.bookingId) ||
                  booking._id.substring(0, 8) === selectedPayment.bookingId
                );

                return (
                  <>
                    {/* Payment Header Card */}
                    <Card className="border-primary/20">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl text-primary">{selectedPayment.id}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">Payment Reference</p>
                          </div>
                          <Badge className={`${getPaymentStatusColor(selectedPayment.status)} text-sm px-3 py-1`}>
                            {selectedPayment.status.toUpperCase()}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Customer</p>
                              <p className="text-lg font-semibold">{selectedPayment.customer}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Booking Reference</p>
                              <p className="text-lg font-semibold">{selectedPayment.bookingId}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Amount</p>
                              <p className="text-2xl font-bold text-primary">{selectedPayment.amount}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Payment Date</p>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <p className="text-lg font-semibold">{selectedPayment.date}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Service Details - Full Information */}
                    <Card>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg text-primary">Service Details</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {correspondingBooking ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Location Information */}
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Pickup Location</p>
                                <p className="font-semibold">{cleanLocationString(correspondingBooking.pickup_location)}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Dropoff Location</p>
                                <p className="font-semibold">{cleanLocationString(correspondingBooking.dropoff_location)}</p>
                              </div>
                              {(() => {
                                const extraStopsMatch = correspondingBooking.special_requirements?.match(/Extra stops?: ([^.]+)/i);
                                if (extraStopsMatch) {
                                  const extraStopsText = extraStopsMatch[1].trim();
                                  const extraStops = extraStopsText.split(',').map(stop => cleanLocationString(stop.trim()));
                                  if (extraStops.length > 0 && extraStops[0] !== 'Location') {
                                    return (
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Extra Stops</p>
                                        <p className="font-semibold">{extraStops.join(', ')}</p>
                                      </div>
                                    );
                                  }
                                }
                                return null;
                              })()}
                            </div>

                            {/* Service Information */}
                            <div className="space-y-4">
                              {(() => {
                                const passengersMatch = correspondingBooking.special_requirements?.match(/(\d+)\s+passenger/i);
                                const passengerCount = passengersMatch ? passengersMatch[1] : '1';
                                return (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Passengers</p>
                                    <p className="font-semibold">{passengerCount} passenger{parseInt(passengerCount) > 1 ? 's' : ''}</p>
                                  </div>
                                );
                              })()}
                              
                              {(() => {
                                const serviceTypeMatch = correspondingBooking.special_requirements?.match(/Service Type: ([^.]+)/i);
                                if (serviceTypeMatch) {
                                  return (
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Service Type</p>
                                      <p className="font-semibold">{serviceTypeMatch[1].trim()}</p>
                                    </div>
                                  );
                                } else if (correspondingBooking.service_type && correspondingBooking.service_type !== 'city_ride') {
                                  const serviceTypeNames: Record<string, string> = {
                                    'airport_pickup': 'Airport Transfers',
                                    'train_pickup': 'Train Station Transfers',
                                    'other': 'Other Services'
                                  };
                                  return (
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Service Type</p>
                                      <p className="font-semibold">{serviceTypeNames[correspondingBooking.service_type] || correspondingBooking.service_type}</p>
                                    </div>
                                  );
                                }
                                return null;
                              })()}

                              {(() => {
                                const vehicleMatch = correspondingBooking.special_requirements?.match(/Vehicle: ([^.]+)/i);
                                if (vehicleMatch) {
                                  return (
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Vehicle</p>
                                      <p className="font-semibold">{vehicleMatch[1].trim()}</p>
                                    </div>
                                  );
                                }
                                return null;
                              })()}

                              {(() => {
                                const distanceMatch = correspondingBooking.special_requirements?.match(/Distance: ([^.]+)/i);
                                if (distanceMatch) {
                                  return (
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Distance</p>
                                      <p className="font-semibold">{distanceMatch[1].trim()}</p>
                                    </div>
                                  );
                                }
                                return null;
                              })()}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Route</p>
                            <p className="font-semibold">{selectedPayment.description}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Travel Information */}
                    {correspondingBooking && (correspondingBooking.flight_number || correspondingBooking.train_number || correspondingBooking.special_requirements?.includes('Terminal:')) && (
                      <Card>
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg text-primary">Travel Information</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {correspondingBooking.flight_number && (
                              <>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Travel Type</p>
                                  <p className="font-semibold">Flight</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Flight Number</p>
                                  <p className="font-semibold">{correspondingBooking.flight_number}</p>
                                </div>
                              </>
                            )}
                            {correspondingBooking.train_number && (
                              <>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Travel Type</p>
                                  <p className="font-semibold">Train</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Train Number</p>
                                  <p className="font-semibold">{correspondingBooking.train_number}</p>
                                </div>
                              </>
                            )}
                            {(() => {
                              const terminalMatch = correspondingBooking.special_requirements?.match(/Terminal: ([^.]+)/i);
                              if (terminalMatch) {
                                return (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Terminal</p>
                                    <p className="font-semibold">{terminalMatch[1].trim()}</p>
                                  </div>
                                );
                              }
                              return null;
                            })()}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Special Requirements */}
                    {correspondingBooking?.special_requirements && (() => {
                      const specialReqs = correspondingBooking.special_requirements
                        .split('. ')
                        .filter(req => 
                          !req.includes('Vehicle:') && 
                          !req.includes('Distance:') && 
                          !req.includes('Duration:') && 
                          !req.includes('Payment ID:') &&
                          !req.includes('Terminal:') &&
                          !req.includes('Extra stops:') &&
                          !req.includes('Service Type:') &&
                          req.trim().length > 0
                        )
                        .join('. ');
                      
                      if (specialReqs) {
                        return (
                          <Card>
                            <CardHeader className="pb-4">
                              <CardTitle className="text-lg text-primary">Special Requirements</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <p className="text-sm leading-relaxed">{specialReqs}</p>
                            </CardContent>
                          </Card>
                        );
                      }
                      return null;
                    })()}

                    {/* Payment Method */}
                    <Card>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg text-primary">Payment Method</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold">{selectedPayment.method}</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedPayment.method === 'Stripe' ? 'Online Payment' : 
                               selectedPayment.method === 'Cash' ? 'Cash Payment' : 
                               selectedPayment.method === 'Bank Transfer' ? 'Bank Transfer' : 'Card Payment'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Company Information */}
                    <Card className="bg-muted/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Company Information</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <p className="font-bold text-primary text-lg">MY FRENCH DRIVER</p>
                          <p className="text-sm text-muted-foreground">Professional Transportation Services</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                            <span>📧 info@myfrenchdriver.com</span>
                            <span>🌐 www.myfrenchdriver.com</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                );
              })()}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => setShowPaymentDetailsModal(false)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleDownloadReceipt(selectedPayment)}
                    className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}