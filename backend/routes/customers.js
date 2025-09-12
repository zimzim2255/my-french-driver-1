const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Customer = require('../models/Customer');
const Booking = require('../models/Booking');
const { auth, requirePermission } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/customers
// @desc    Get all customers with pagination and filters
// @access  Private (Admin)
router.get('/', [
  auth,
  requirePermission('manage_customers'),
  [
    query('page', 'Page must be a positive integer').optional().isInt({ min: 1 }),
    query('limit', 'Limit must be between 1 and 100').optional().isInt({ min: 1, max: 100 }),
    query('status', 'Invalid customer status').optional().isIn(['active', 'inactive', 'blocked']),
    query('vip_status', 'VIP status must be boolean').optional().isBoolean(),
    query('sort_by', 'Invalid sort field').optional().isIn(['name', 'email', 'total_spent', 'total_bookings', 'created_at']),
    query('sort_order', 'Sort order must be asc or desc').optional().isIn(['asc', 'desc'])
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
      vip_status,
      search,
      sort_by = 'created_at',
      sort_order = 'desc',
      min_spent,
      max_spent
    } = req.query;

    // Build query
    let query = {};

    if (status) query.status = status;
    if (vip_status !== undefined) query.vip_status = vip_status === 'true';
    
    if (min_spent || max_spent) {
      query.total_spent = {};
      if (min_spent) query.total_spent.$gte = parseFloat(min_spent);
      if (max_spent) query.total_spent.$lte = parseFloat(max_spent);
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sortObj = {};
    sortObj[sort_by] = sort_order === 'asc' ? 1 : -1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const customers = await Customer.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Customer.countDocuments(query);

    // Add computed fields
    const customersWithExtras = customers.map(customer => ({
      ...customer.toObject(),
      customer_tier: customer.customer_tier,
      lifetime_value: customer.getLifetimeValue()
    }));

    res.json({
      customers: customersWithExtras,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(total / limit),
        total_items: total,
        items_per_page: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/customers/:id
// @desc    Get customer by ID
// @access  Private (Admin)
router.get('/:id', [
  auth,
  requirePermission('manage_customers')
], async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Get customer's bookings
    const bookings = await Booking.find({ customer_email: customer.email })
      .sort({ created_at: -1 })
      .limit(10);

    const customerData = {
      ...customer.toObject(),
      customer_tier: customer.customer_tier,
      lifetime_value: customer.getLifetimeValue(),
      recent_bookings: bookings
    };

    res.json({ customer: customerData });

  } catch (error) {
    console.error('Get customer error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid customer ID' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/customers
// @desc    Create new customer
// @access  Private (Admin)
router.post('/', [
  auth,
  requirePermission('manage_customers'),
  [
    body('name', 'Name is required').notEmpty().trim().isLength({ max: 100 }),
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('phone', 'Please include a valid phone number').isMobilePhone(),
    body('address.street', 'Street address cannot exceed 200 characters').optional().isLength({ max: 200 }),
    body('address.city', 'City cannot exceed 100 characters').optional().isLength({ max: 100 }),
    body('address.postal_code', 'Postal code cannot exceed 20 characters').optional().isLength({ max: 20 }),
    body('address.country', 'Country cannot exceed 100 characters').optional().isLength({ max: 100 })
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, address, special_requirements } = req.body;

    // Check if customer already exists
    let existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Customer with this email already exists' });
    }

    // Create new customer
    const customer = new Customer({
      name,
      email,
      phone,
      address,
      special_requirements
    });

    await customer.save();

    res.status(201).json({
      message: 'Customer created successfully',
      customer
    });

  } catch (error) {
    console.error('Create customer error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/customers/:id
// @desc    Update customer
// @access  Private (Admin)
router.put('/:id', [
  auth,
  requirePermission('manage_customers'),
  [
    body('name', 'Name cannot exceed 100 characters').optional().trim().isLength({ max: 100 }),
    body('email', 'Please include a valid email').optional().isEmail().normalizeEmail(),
    body('phone', 'Please include a valid phone number').optional().isMobilePhone(),
    body('status', 'Invalid status').optional().isIn(['active', 'inactive', 'blocked']),
    body('vip_status', 'VIP status must be boolean').optional().isBoolean(),
    body('address.street', 'Street address cannot exceed 200 characters').optional().isLength({ max: 200 }),
    body('address.city', 'City cannot exceed 100 characters').optional().isLength({ max: 100 }),
    body('address.postal_code', 'Postal code cannot exceed 20 characters').optional().isLength({ max: 20 }),
    body('address.country', 'Country cannot exceed 100 characters').optional().isLength({ max: 100 })
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const {
      name,
      email,
      phone,
      address,
      status,
      vip_status,
      special_requirements,
      preferred_pickup_locations,
      preferred_dropoff_locations,
      email_notifications,
      sms_notifications,
      marketing_emails
    } = req.body;

    // Check if email is being changed and if it already exists
    if (email && email !== customer.email) {
      const existingCustomer = await Customer.findOne({ email });
      if (existingCustomer) {
        return res.status(400).json({ error: 'Customer with this email already exists' });
      }
    }

    // Update fields
    if (name) customer.name = name;
    if (email) customer.email = email;
    if (phone) customer.phone = phone;
    if (address) customer.address = { ...customer.address, ...address };
    if (status) customer.status = status;
    if (vip_status !== undefined) customer.vip_status = vip_status;
    if (special_requirements !== undefined) customer.special_requirements = special_requirements;
    if (preferred_pickup_locations) customer.preferred_pickup_locations = preferred_pickup_locations;
    if (preferred_dropoff_locations) customer.preferred_dropoff_locations = preferred_dropoff_locations;
    if (email_notifications !== undefined) customer.email_notifications = email_notifications;
    if (sms_notifications !== undefined) customer.sms_notifications = sms_notifications;
    if (marketing_emails !== undefined) customer.marketing_emails = marketing_emails;

    await customer.save();

    res.json({
      message: 'Customer updated successfully',
      customer
    });

  } catch (error) {
    console.error('Update customer error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/customers/:id
// @desc    Delete customer (soft delete - set status to inactive)
// @access  Private (Admin)
router.delete('/:id', [
  auth,
  requirePermission('manage_customers')
], async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Check if customer has active bookings
    const activeBookings = await Booking.countDocuments({
      customer_email: customer.email,
      booking_status: { $in: ['pending', 'confirmed', 'in_progress'] }
    });

    if (activeBookings > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete customer with active bookings. Please complete or cancel all active bookings first.' 
      });
    }

    // Soft delete - set status to inactive
    customer.status = 'inactive';
    await customer.save();

    res.json({ message: 'Customer deactivated successfully' });

  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/customers/:id/bookings
// @desc    Get customer's booking history
// @access  Private (Admin)
router.get('/:id/bookings', [
  auth,
  requirePermission('manage_customers'),
  [
    query('page', 'Page must be a positive integer').optional().isInt({ min: 1 }),
    query('limit', 'Limit must be between 1 and 50').optional().isInt({ min: 1, max: 50 }),
    query('status', 'Invalid booking status').optional().isIn(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'])
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const { page = 1, limit = 10, status } = req.query;

    // Build query
    let query = { customer_email: customer.email };
    if (status) query.booking_status = status;

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
    console.error('Get customer bookings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/customers/:id/loyalty-points
// @desc    Add loyalty points to customer
// @access  Private (Admin)
router.post('/:id/loyalty-points', [
  auth,
  requirePermission('manage_customers'),
  [
    body('points', 'Points must be a positive number').isInt({ min: 1 }),
    body('reason', 'Reason is required').notEmpty().trim()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const { points, reason } = req.body;

    customer.loyalty_points += points;
    await customer.save();

    res.json({
      message: 'Loyalty points added successfully',
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        loyalty_points: customer.loyalty_points
      },
      points_added: points,
      reason
    });

  } catch (error) {
    console.error('Add loyalty points error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/customers/stats/overview
// @desc    Get customer statistics overview
// @access  Private (Admin)
router.get('/stats/overview', [
  auth,
  requirePermission('view_dashboard')
], async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const stats = await Promise.all([
      // Total customers
      Customer.countDocuments(),
      
      // Active customers
      Customer.countDocuments({ status: 'active' }),
      
      // VIP customers
      Customer.countDocuments({ vip_status: true }),
      
      // New customers this month
      Customer.countDocuments({ created_at: { $gte: startOfMonth } }),
      
      // New customers this year
      Customer.countDocuments({ created_at: { $gte: startOfYear } }),
      
      // Customer tier distribution
      Customer.aggregate([
        {
          $addFields: {
            tier: {
              $switch: {
                branches: [
                  { case: { $gte: ['$total_spent', 5000] }, then: 'Platinum' },
                  { case: { $gte: ['$total_spent', 2000] }, then: 'Gold' },
                  { case: { $gte: ['$total_spent', 500] }, then: 'Silver' }
                ],
                default: 'Bronze'
              }
            }
          }
        },
        { $group: { _id: '$tier', count: { $sum: 1 } } }
      ]),
      
      // Average customer lifetime value
      Customer.aggregate([
        { $group: { _id: null, avg_spent: { $avg: '$total_spent' }, avg_bookings: { $avg: '$total_bookings' } } }
      ])
    ]);

    const tierDistribution = {};
    stats[5].forEach(item => {
      tierDistribution[item._id] = item.count;
    });

    res.json({
      total_customers: stats[0],
      active_customers: stats[1],
      vip_customers: stats[2],
      new_customers_month: stats[3],
      new_customers_year: stats[4],
      tier_distribution: tierDistribution,
      average_lifetime_value: stats[6][0]?.avg_spent || 0,
      average_bookings_per_customer: stats[6][0]?.avg_bookings || 0
    });

  } catch (error) {
    console.error('Get customer stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/customers/export
// @desc    Export customers to CSV
// @access  Private (Admin)
router.get('/export', [
  auth,
  requirePermission('view_reports')
], async (req, res) => {
  try {
    const customers = await Customer.find({ status: 'active' })
      .sort({ created_at: -1 });

    // Convert to CSV format
    const csvHeader = 'Name,Email,Phone,Total Bookings,Total Spent,VIP Status,Customer Tier,Created Date\n';
    const csvData = customers.map(customer => {
      return [
        customer.name,
        customer.email,
        customer.phone,
        customer.total_bookings,
        customer.total_spent,
        customer.vip_status ? 'Yes' : 'No',
        customer.customer_tier,
        customer.created_at.toISOString().split('T')[0]
      ].join(',');
    }).join('\n');

    const csv = csvHeader + csvData;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=customers.csv');
    res.send(csv);

  } catch (error) {
    console.error('Export customers error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;