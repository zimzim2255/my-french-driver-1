const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');
const Driver = require('../models/Driver');
const { auth, requirePermission, optionalAuth } = require('../middleware/auth');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Public
router.post('/', 
  [
    body('customer_name', 'Customer name is required').notEmpty().trim().isLength({ max: 100 }),
    body('customer_email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('customer_phone', 'Please include a valid phone number').matches(/^[0-9+\-\s()]{8,15}$/),
    body('service_type', 'Service type is required').isIn(['city_ride', 'airport_pickup', 'train_pickup', 'other']),
    body('pickup_location', 'Pickup location is required').notEmpty().trim().isLength({ max: 200 }),
    body('dropoff_location', 'Drop-off location is required').notEmpty().trim().isLength({ max: 200 }),
    body('date_time', 'Date and time is required').isISO8601().toDate(),
    body('base_price', 'Base price is required').isFloat({ min: 0 }),
    body('flight_number', 'Flight number is required for airport pickup').optional().trim().isLength({ max: 20 }),
    body('train_number', 'Train number is required for train pickup').optional().trim().isLength({ max: 20 }),
    body('special_requirements', 'Special requirements cannot exceed 500 characters').optional().isLength({ max: 500 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      customer_name,
      customer_email,
      customer_phone,
      service_type,
      pickup_location,
      dropoff_location,
      date_time,
      base_price,
      additional_fees = 0,
      flight_number,
      train_number,
      special_requirements
    } = req.body;

    // Validate service-specific requirements
    if (service_type === 'airport_pickup' && !flight_number) {
      return res.status(400).json({ error: 'Flight number is required for airport pickup' });
    }
    if (service_type === 'train_pickup' && !train_number) {
      return res.status(400).json({ error: 'Train number is required for train pickup' });
    }

    // Check if booking date is in the future
    if (new Date(date_time) <= new Date()) {
      return res.status(400).json({ error: 'Booking date must be in the future' });
    }

    // Find or create customer
    let customer = await Customer.findOne({ email: customer_email });
    if (!customer) {
      customer = new Customer({
        name: customer_name,
        email: customer_email,
        phone: customer_phone
      });
      await customer.save();
    }

    // Create booking
    const booking = new Booking({
      customer_name,
      customer_email,
      customer_phone,
      service_type,
      pickup_location,
      dropoff_location,
      date_time,
      base_price,
      additional_fees,
      flight_number,
      train_number,
      special_requirements
    });

    await booking.save();

    // Update customer statistics
    customer.total_bookings += 1;
    if (!customer.first_booking_date) {
      customer.first_booking_date = new Date();
    }
    customer.last_booking_date = new Date();
    await customer.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
      booking_reference: booking.booking_reference
    });
    
    } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Server error' });
    }
});

// @route   GET /api/bookings
// @desc    Get all bookings (admin) or customer bookings
// @access  Private/Public
router.get('/', [
  optionalAuth,
  [
    query('page', 'Page must be a positive integer').optional().isInt({ min: 1 }),
    query('limit', 'Limit must be between 1 and 100').optional().isInt({ min: 1, max: 100 }),
    query('status', 'Invalid booking status').optional().isIn(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']),
    query('service_type', 'Invalid service type').optional().isIn(['city_ride', 'airport_pickup', 'train_pickup', 'other']),
    query('customer_email', 'Please include a valid email').optional().isEmail()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 10,
      status,
      service_type,
      customer_email,
      start_date,
      end_date,
      search
    } = req.query;

    // Build query
    let query = {};

    // If not admin, only show bookings for provided email
    if (!req.admin && customer_email) {
      query.customer_email = customer_email;
    } else if (!req.admin) {
      return res.status(401).json({ error: 'Authentication required or provide customer_email' });
    }

    // Apply filters
    if (status) query.booking_status = status;
    if (service_type) query.service_type = service_type;
    if (start_date || end_date) {
      query.date_time = {};
      if (start_date) query.date_time.$gte = new Date(start_date);
      if (end_date) query.date_time.$lte = new Date(end_date);
    }

    // Search functionality
    if (search) {
      query.$or = [
        { customer_name: { $regex: search, $options: 'i' } },
        { customer_email: { $regex: search, $options: 'i' } },
        { pickup_location: { $regex: search, $options: 'i' } },
        { dropoff_location: { $regex: search, $options: 'i' } },
        { flight_number: { $regex: search, $options: 'i' } },
        { train_number: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const bookings = await Booking.find(query)
      .populate('driver_assigned', 'name email phone')
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(query);

    res.json({
      bookings,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(total / limit),
        total_items: total,
        items_per_page: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private/Public (with email verification)
router.get('/:id', [
  optionalAuth,
  query('customer_email', 'Customer email is required for non-admin access').optional().isEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const booking = await Booking.findById(req.params.id)
      .populate('driver_assigned', 'name email phone vehicles');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // If not admin, verify customer email
    if (!req.admin) {
      const { customer_email } = req.query;
      if (!customer_email || booking.customer_email !== customer_email) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }

    res.json({ booking });

  } catch (error) {
    console.error('Get booking error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid booking ID' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking
// @access  Private (Admin)
router.put('/:id', [
  auth,
  requirePermission('manage_bookings'),
  [
    body('booking_status', 'Invalid booking status').optional().isIn(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']),
    body('payment_status', 'Invalid payment status').optional().isIn(['pending', 'paid', 'failed', 'refunded']),
    body('admin_notes', 'Admin notes cannot exceed 1000 characters').optional().isLength({ max: 1000 }),
    body('driver_notes', 'Driver notes cannot exceed 500 characters').optional().isLength({ max: 500 })
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const {
      booking_status,
      payment_status,
      admin_notes,
      driver_notes,
      driver_assigned
    } = req.body;

    // Update fields
    if (booking_status) {
      booking.booking_status = booking_status;
      if (booking_status === 'confirmed') {
        booking.confirmed_at = new Date();
      } else if (booking_status === 'completed') {
        booking.completed_at = new Date();
      }
    }
    if (payment_status) booking.payment_status = payment_status;
    if (admin_notes) booking.admin_notes = admin_notes;
    if (driver_notes) booking.driver_notes = driver_notes;
    if (driver_assigned) booking.driver_assigned = driver_assigned;

    await booking.save();

    // Update customer statistics if booking completed
    if (booking_status === 'completed' && booking.payment_status === 'paid') {
      const customer = await Customer.findOne({ email: booking.customer_email });
      if (customer) {
        customer.completed_bookings += 1;
        customer.total_spent += booking.total_price;
        customer.addLoyaltyPoints(booking.total_price);
        await customer.save();
      }
    }

    const updatedBooking = await Booking.findById(req.params.id)
      .populate('driver_assigned', 'name email phone');

    res.json({
      message: 'Booking updated successfully',
      booking: updatedBooking
    });

  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Cancel booking
// @access  Private (Admin) or Public (with email verification)
router.delete('/:id', [
  optionalAuth,
  query('customer_email', 'Customer email is required for non-admin access').optional().isEmail()
], async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // If not admin, verify customer email and cancellation eligibility
    if (!req.admin) {
      const { customer_email } = req.query;
      if (!customer_email || booking.customer_email !== customer_email) {
        return res.status(403).json({ error: 'Access denied' });
      }

      if (!booking.canBeCancelled()) {
        return res.status(400).json({ 
          error: 'Booking cannot be cancelled. Must be at least 24 hours before booking time.' 
        });
      }
    }

    // Update booking status instead of deleting
    booking.booking_status = 'cancelled';
    await booking.save();

    // Update customer statistics
    const customer = await Customer.findOne({ email: booking.customer_email });
    if (customer) {
      customer.cancelled_bookings += 1;
      await customer.save();
    }

    res.json({ message: 'Booking cancelled successfully' });

  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/bookings/:id/assign-driver
// @desc    Assign driver to booking
// @access  Private (Admin)
router.post('/:id/assign-driver', [
  auth,
  requirePermission('manage_bookings'),
  [
    body('driver_id', 'Driver ID is required').notEmpty().isMongoId()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const driver = await Driver.findById(req.body.driver_id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    if (driver.status !== 'active') {
      return res.status(400).json({ error: 'Driver is not active' });
    }

    // Check driver availability
    if (!driver.isAvailableAt(new Date(booking.date_time))) {
      return res.status(400).json({ error: 'Driver is not available at the requested time' });
    }

    booking.driver_assigned = req.body.driver_id;
    booking.booking_status = 'confirmed';
    booking.confirmed_at = new Date();
    await booking.save();

    const updatedBooking = await Booking.findById(req.params.id)
      .populate('driver_assigned', 'name email phone vehicles');

    res.json({
      message: 'Driver assigned successfully',
      booking: updatedBooking
    });

  } catch (error) {
    console.error('Assign driver error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/bookings/stats/overview
// @desc    Get booking statistics overview
// @access  Private (Admin)
router.get('/stats/overview', [
  auth,
  requirePermission('view_dashboard')
], async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const stats = await Promise.all([
      // Total bookings
      Booking.countDocuments(),
      
      // Today's bookings
      Booking.countDocuments({ created_at: { $gte: startOfDay } }),
      
      // This week's bookings
      Booking.countDocuments({ created_at: { $gte: startOfWeek } }),
      
      // This month's bookings
      Booking.countDocuments({ created_at: { $gte: startOfMonth } }),
      
      // Pending bookings
      Booking.countDocuments({ booking_status: 'pending' }),
      
      // Confirmed bookings
      Booking.countDocuments({ booking_status: 'confirmed' }),
      
      // Completed bookings
      Booking.countDocuments({ booking_status: 'completed' }),
      
      // Total revenue
      Booking.aggregate([
        { $match: { payment_status: 'paid' } },
        { $group: { _id: null, total: { $sum: '$total_price' } } }
      ])
    ]);

    res.json({
      total_bookings: stats[0],
      today_bookings: stats[1],
      week_bookings: stats[2],
      month_bookings: stats[3],
      pending_bookings: stats[4],
      confirmed_bookings: stats[5],
      completed_bookings: stats[6],
      total_revenue: stats[7][0]?.total || 0
    });

  } catch (error) {
    console.error('Get booking stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;