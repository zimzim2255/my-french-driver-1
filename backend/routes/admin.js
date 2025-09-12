const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Admin = require('../models/Admin');
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');
const Driver = require('../models/Driver');
const Message = require('../models/Message');
const { auth, requirePermission, requireRole } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private (Admin)
router.get('/dashboard', [
  auth,
  requirePermission('view_dashboard')
], async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    // Get comprehensive dashboard statistics
    const [
      bookingStats,
      customerStats,
      driverStats,
      messageStats,
      revenueStats,
      recentBookings,
      recentMessages,
      topCustomers,
      topDrivers
    ] = await Promise.all([
      // Booking statistics
      Promise.all([
        Booking.countDocuments(),
        Booking.countDocuments({ created_at: { $gte: startOfDay } }),
        Booking.countDocuments({ created_at: { $gte: startOfWeek } }),
        Booking.countDocuments({ created_at: { $gte: startOfMonth } }),
        Booking.countDocuments({ booking_status: 'pending' }),
        Booking.countDocuments({ booking_status: 'confirmed' }),
        Booking.countDocuments({ booking_status: 'completed' }),
        Booking.aggregate([
          { $group: { _id: '$booking_status', count: { $sum: 1 } } }
        ])
      ]),

      // Customer statistics
      Promise.all([
        Customer.countDocuments(),
        Customer.countDocuments({ status: 'active' }),
        Customer.countDocuments({ vip_status: true }),
        Customer.countDocuments({ created_at: { $gte: startOfMonth } })
      ]),

      // Driver statistics
      Promise.all([
        Driver.countDocuments(),
        Driver.countDocuments({ status: 'active' }),
        Driver.countDocuments({ status: 'active', availability_status: 'available' }),
        Driver.countDocuments({ status: 'active', availability_status: 'busy' })
      ]),

      // Message statistics
      Promise.all([
        Message.countDocuments(),
        Message.countDocuments({ status: 'new' }),
        Message.countDocuments({ created_at: { $gte: startOfDay } }),
        Message.getNeedingAttention().countDocuments()
      ]),

      // Revenue statistics
      Promise.all([
        Booking.aggregate([
          { $match: { payment_status: 'paid' } },
          { $group: { _id: null, total: { $sum: '$total_price' } } }
        ]),
        Booking.aggregate([
          { $match: { payment_status: 'paid', created_at: { $gte: startOfDay } } },
          { $group: { _id: null, total: { $sum: '$total_price' } } }
        ]),
        Booking.aggregate([
          { $match: { payment_status: 'paid', created_at: { $gte: startOfMonth } } },
          { $group: { _id: null, total: { $sum: '$total_price' } } }
        ]),
        Booking.aggregate([
          { $match: { payment_status: 'paid', created_at: { $gte: startOfYear } } },
          { $group: { _id: null, total: { $sum: '$total_price' } } }
        ])
      ]),

      // Recent bookings
      Booking.find()
        .populate('driver_assigned', 'name')
        .sort({ created_at: -1 })
        .limit(10)
        .select('customer_name service_type booking_status payment_status total_price created_at'),

      // Recent messages
      Message.find()
        .sort({ created_at: -1 })
        .limit(10)
        .select('sender_name subject status priority created_at'),

      // Top customers by spending
      Customer.find({ status: 'active' })
        .sort({ total_spent: -1 })
        .limit(5)
        .select('name email total_spent total_bookings'),

      // Top drivers by rating
      Driver.find({ status: 'active', total_rides: { $gte: 5 } })
        .sort({ average_rating: -1, total_rides: -1 })
        .limit(5)
        .select('name email average_rating total_rides completion_rate')
    ]);

    // Process booking status breakdown
    const bookingStatusBreakdown = {};
    bookingStats[7].forEach(item => {
      bookingStatusBreakdown[item._id] = item.count;
    });

    // Prepare dashboard data
    const dashboardData = {
      overview: {
        total_bookings: bookingStats[0],
        total_customers: customerStats[0],
        total_drivers: driverStats[0],
        total_messages: messageStats[0],
        total_revenue: revenueStats[0][0]?.total || 0
      },
      today: {
        new_bookings: bookingStats[1],
        new_messages: messageStats[2],
        revenue: revenueStats[1][0]?.total || 0
      },
      this_week: {
        new_bookings: bookingStats[2]
      },
      this_month: {
        new_bookings: bookingStats[3],
        new_customers: customerStats[3],
        revenue: revenueStats[2][0]?.total || 0
      },
      this_year: {
        revenue: revenueStats[3][0]?.total || 0
      },
      bookings: {
        pending: bookingStats[4],
        confirmed: bookingStats[5],
        completed: bookingStats[6],
        status_breakdown: bookingStatusBreakdown
      },
      customers: {
        total: customerStats[0],
        active: customerStats[1],
        vip: customerStats[2]
      },
      drivers: {
        total: driverStats[0],
        active: driverStats[1],
        available: driverStats[2],
        busy: driverStats[3]
      },
      messages: {
        total: messageStats[0],
        new: messageStats[1],
        needing_attention: messageStats[3]
      },
      recent_activity: {
        bookings: recentBookings,
        messages: recentMessages
      },
      top_performers: {
        customers: topCustomers,
        drivers: topDrivers
      }
    };

    res.json(dashboardData);

  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/users
// @desc    Get all admin users
// @access  Private (Super Admin)
router.get('/users', [
  auth,
  requireRole('super_admin'),
  [
    query('page', 'Page must be a positive integer').optional().isInt({ min: 1 }),
    query('limit', 'Limit must be between 1 and 100').optional().isInt({ min: 1, max: 100 }),
    query('status', 'Invalid status').optional().isIn(['active', 'inactive', 'suspended']),
    query('role', 'Invalid role').optional().isIn(['super_admin', 'admin', 'manager', 'support'])
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
      role,
      search
    } = req.query;

    // Build query
    let query = {};
    if (status) query.status = status;
    if (role) query.role = role;

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const admins = await Admin.find(query)
      .populate('created_by', 'name email')
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Admin.countDocuments(query);

    res.json({
      admins,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(total / limit),
        total_items: total,
        items_per_page: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/users/:id
// @desc    Get admin user by ID
// @access  Private (Super Admin)
router.get('/users/:id', [
  auth,
  requireRole('super_admin')
], async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id)
      .populate('created_by', 'name email');

    if (!admin) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    res.json({ admin });

  } catch (error) {
    console.error('Get admin user error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid admin ID' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update admin user
// @access  Private (Super Admin)
router.put('/users/:id', [
  auth,
  requireRole('super_admin'),
  [
    body('name', 'Name cannot exceed 100 characters').optional().trim().isLength({ max: 100 }),
    body('email', 'Please include a valid email').optional().isEmail().normalizeEmail(),
    body('role', 'Invalid role').optional().isIn(['super_admin', 'admin', 'manager', 'support']),
    body('status', 'Invalid status').optional().isIn(['active', 'inactive', 'suspended']),
    body('permissions', 'Permissions must be an array').optional().isArray()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    // Prevent self-modification of critical fields
    if (admin._id.toString() === req.admin.id) {
      if (req.body.role || req.body.status) {
        return res.status(400).json({ error: 'Cannot modify your own role or status' });
      }
    }

    const {
      name,
      email,
      role,
      status,
      permissions,
      phone,
      department,
      position
    } = req.body;

    // Check if email is being changed and if it already exists
    if (email && email !== admin.email) {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ error: 'Admin with this email already exists' });
      }
    }

    // Update fields
    if (name) admin.name = name;
    if (email) admin.email = email;
    if (role) {
      admin.role = role;
      admin.permissions = permissions || Admin.getDefaultPermissions(role);
    }
    if (status) admin.status = status;
    if (permissions && !role) admin.permissions = permissions;
    if (phone) admin.phone = phone;
    if (department) admin.department = department;
    if (position) admin.position = position;

    await admin.save();

    res.json({
      message: 'Admin user updated successfully',
      admin
    });

  } catch (error) {
    console.error('Update admin user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete admin user (soft delete)
// @access  Private (Super Admin)
router.delete('/users/:id', [
  auth,
  requireRole('super_admin')
], async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    // Prevent self-deletion
    if (admin._id.toString() === req.admin.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    // Soft delete - set status to inactive
    admin.status = 'inactive';
    await admin.save();

    res.json({ message: 'Admin user deactivated successfully' });

  } catch (error) {
    console.error('Delete admin user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/reports/bookings
// @desc    Get booking reports
// @access  Private (Admin)
router.get('/reports/bookings', [
  auth,
  requirePermission('view_reports'),
  [
    query('start_date', 'Start date is required').isISO8601().toDate(),
    query('end_date', 'End date is required').isISO8601().toDate(),
    query('group_by', 'Invalid group by option').optional().isIn(['day', 'week', 'month'])
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { start_date, end_date, group_by = 'day' } = req.query;

    // Build aggregation pipeline
    let groupFormat;
    switch (group_by) {
      case 'week':
        groupFormat = { $dateToString: { format: "%Y-W%U", date: "$created_at" } };
        break;
      case 'month':
        groupFormat = { $dateToString: { format: "%Y-%m", date: "$created_at" } };
        break;
      default:
        groupFormat = { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } };
    }

    const bookingReport = await Booking.aggregate([
      {
        $match: {
          created_at: {
            $gte: new Date(start_date),
            $lte: new Date(end_date)
          }
        }
      },
      {
        $group: {
          _id: {
            date: groupFormat,
            status: '$booking_status',
            service_type: '$service_type'
          },
          count: { $sum: 1 },
          total_revenue: { $sum: '$total_price' },
          avg_price: { $avg: '$total_price' }
        }
      },
      {
        $sort: { '_id.date': 1 }
      }
    ]);

    // Get summary statistics
    const summary = await Booking.aggregate([
      {
        $match: {
          created_at: {
            $gte: new Date(start_date),
            $lte: new Date(end_date)
          }
        }
      },
      {
        $group: {
          _id: null,
          total_bookings: { $sum: 1 },
          total_revenue: { $sum: '$total_price' },
          avg_booking_value: { $avg: '$total_price' },
          completed_bookings: {
            $sum: { $cond: [{ $eq: ['$booking_status', 'completed'] }, 1, 0] }
          },
          cancelled_bookings: {
            $sum: { $cond: [{ $eq: ['$booking_status', 'cancelled'] }, 1, 0] }
          }
        }
      }
    ]);

    res.json({
      report_data: bookingReport,
      summary: summary[0] || {
        total_bookings: 0,
        total_revenue: 0,
        avg_booking_value: 0,
        completed_bookings: 0,
        cancelled_bookings: 0
      },
      period: {
        start_date,
        end_date,
        group_by
      }
    });

  } catch (error) {
    console.error('Get booking reports error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/reports/revenue
// @desc    Get revenue reports
// @access  Private (Admin)
router.get('/reports/revenue', [
  auth,
  requirePermission('view_reports'),
  [
    query('start_date', 'Start date is required').isISO8601().toDate(),
    query('end_date', 'End date is required').isISO8601().toDate(),
    query('group_by', 'Invalid group by option').optional().isIn(['day', 'week', 'month'])
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { start_date, end_date, group_by = 'day' } = req.query;

    // Build aggregation pipeline
    let groupFormat;
    switch (group_by) {
      case 'week':
        groupFormat = { $dateToString: { format: "%Y-W%U", date: "$created_at" } };
        break;
      case 'month':
        groupFormat = { $dateToString: { format: "%Y-%m", date: "$created_at" } };
        break;
      default:
        groupFormat = { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } };
    }

    const revenueReport = await Booking.aggregate([
      {
        $match: {
          payment_status: 'paid',
          created_at: {
            $gte: new Date(start_date),
            $lte: new Date(end_date)
          }
        }
      },
      {
        $group: {
          _id: {
            date: groupFormat,
            service_type: '$service_type'
          },
          revenue: { $sum: '$total_price' },
          bookings: { $sum: 1 },
          avg_value: { $avg: '$total_price' }
        }
      },
      {
        $sort: { '_id.date': 1 }
      }
    ]);

    // Get top customers by revenue
    const topCustomers = await Booking.aggregate([
      {
        $match: {
          payment_status: 'paid',
          created_at: {
            $gte: new Date(start_date),
            $lte: new Date(end_date)
          }
        }
      },
      {
        $group: {
          _id: '$customer_email',
          customer_name: { $first: '$customer_name' },
          total_spent: { $sum: '$total_price' },
          bookings: { $sum: 1 }
        }
      },
      {
        $sort: { total_spent: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.json({
      revenue_data: revenueReport,
      top_customers: topCustomers,
      period: {
        start_date,
        end_date,
        group_by
      }
    });

  } catch (error) {
    console.error('Get revenue reports error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/reports/drivers
// @desc    Get driver performance reports
// @access  Private (Admin)
router.get('/reports/drivers', [
  auth,
  requirePermission('view_reports')
], async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    let matchStage = {};
    if (start_date && end_date) {
      matchStage.created_at = {
        $gte: new Date(start_date),
        $lte: new Date(end_date)
      };
    }

    // Get driver performance data
    const driverPerformance = await Booking.aggregate([
      {
        $match: {
          driver_assigned: { $exists: true },
          ...matchStage
        }
      },
      {
        $lookup: {
          from: 'drivers',
          localField: 'driver_assigned',
          foreignField: '_id',
          as: 'driver'
        }
      },
      {
        $unwind: '$driver'
      },
      {
        $group: {
          _id: '$driver_assigned',
          driver_name: { $first: '$driver.name' },
          driver_email: { $first: '$driver.email' },
          total_rides: { $sum: 1 },
          completed_rides: {
            $sum: { $cond: [{ $eq: ['$booking_status', 'completed'] }, 1, 0] }
          },
          cancelled_rides: {
            $sum: { $cond: [{ $eq: ['$booking_status', 'cancelled'] }, 1, 0] }
          },
          total_revenue: { $sum: '$total_price' },
          avg_rating: { $first: '$driver.average_rating' }
        }
      },
      {
        $addFields: {
          completion_rate: {
            $multiply: [
              { $divide: ['$completed_rides', '$total_rides'] },
              100
            ]
          },
          cancellation_rate: {
            $multiply: [
              { $divide: ['$cancelled_rides', '$total_rides'] },
              100
            ]
          }
        }
      },
      {
        $sort: { completion_rate: -1, avg_rating: -1 }
      }
    ]);

    res.json({
      driver_performance: driverPerformance,
      period: start_date && end_date ? { start_date, end_date } : 'all_time'
    });

  } catch (error) {
    console.error('Get driver reports error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/admin/notifications/send
// @desc    Send notification to customers
// @access  Private (Admin)
router.post('/notifications/send', [
  auth,
  requirePermission('send_notifications'),
  [
    body('title', 'Title is required').notEmpty().trim().isLength({ max: 100 }),
    body('message', 'Message is required').notEmpty().trim().isLength({ max: 500 }),
    body('recipient_type', 'Invalid recipient type').isIn(['all', 'vip', 'active', 'specific']),
    body('recipient_emails', 'Recipient emails must be an array').optional().isArray()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, message, recipient_type, recipient_emails } = req.body;

    // Build recipient query
    let recipientQuery = {};
    switch (recipient_type) {
      case 'vip':
        recipientQuery = { status: 'active', vip_status: true };
        break;
      case 'active':
        recipientQuery = { status: 'active' };
        break;
      case 'specific':
        if (!recipient_emails || recipient_emails.length === 0) {
          return res.status(400).json({ error: 'Recipient emails are required for specific notifications' });
        }
        recipientQuery = { email: { $in: recipient_emails } };
        break;
      default:
        recipientQuery = { status: 'active' };
    }

    // Get recipients
    const recipients = await Customer.find(recipientQuery).select('email name');

    // TODO: Implement actual email sending logic here
    // For now, just log the notification
    console.log(`Notification sent to ${recipients.length} recipients:`);
    console.log(`Title: ${title}`);
    console.log(`Message: ${message}`);

    res.json({
      message: 'Notification sent successfully',
      recipients_count: recipients.length,
      notification: {
        title,
        message,
        recipient_type,
        sent_at: new Date(),
        sent_by: req.admin.id
      }
    });

  } catch (error) {
    console.error('Send notification error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/system/health
// @desc    Get system health status
// @access  Private (Super Admin)
router.get('/system/health', [
  auth,
  requireRole('super_admin')
], async (req, res) => {
  try {
    const healthChecks = {
      database: 'healthy',
      server: 'healthy',
      memory_usage: process.memoryUsage(),
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };

    // Check database connection
    try {
      await Admin.findOne().limit(1);
    } catch (dbError) {
      healthChecks.database = 'unhealthy';
      healthChecks.database_error = dbError.message;
    }

    // Get basic system stats
    const stats = await Promise.all([
      Booking.countDocuments(),
      Customer.countDocuments(),
      Driver.countDocuments(),
      Message.countDocuments(),
      Admin.countDocuments()
    ]);

    healthChecks.data_counts = {
      bookings: stats[0],
      customers: stats[1],
      drivers: stats[2],
      messages: stats[3],
      admins: stats[4]
    };

    res.json(healthChecks);

  } catch (error) {
    console.error('System health check error:', error);
    res.status(500).json({
      database: 'unhealthy',
      server: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;