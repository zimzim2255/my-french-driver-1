const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Message = require('../models/Message');
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');
const { auth, requirePermission, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/messages
// @desc    Create new message/inquiry
// @access  Public
router.post('/', [
  [
    body('sender_name', 'Sender name is required').notEmpty().trim().isLength({ max: 100 }),
    body('sender_email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('sender_phone', 'Please include a valid phone number').optional().isMobilePhone(),
    body('subject', 'Subject is required').notEmpty().trim().isLength({ max: 200 }),
    body('message', 'Message is required').notEmpty().trim().isLength({ max: 2000 }),
    body('message_type', 'Invalid message type').optional().isIn(['inquiry', 'complaint', 'feedback', 'support', 'booking_related', 'other']),
    body('priority', 'Invalid priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
    body('related_booking', 'Invalid booking ID').optional().isMongoId()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      sender_name,
      sender_email,
      sender_phone,
      subject,
      message,
      message_type = 'inquiry',
      priority = 'medium',
      related_booking,
      source = 'website'
    } = req.body;

    // Find customer if exists
    let customer = await Customer.findOne({ email: sender_email });
    let customer_id = customer ? customer._id : null;

    // Validate related booking if provided
    if (related_booking) {
      const booking = await Booking.findById(related_booking);
      if (!booking) {
        return res.status(400).json({ error: 'Related booking not found' });
      }
      if (booking.customer_email !== sender_email) {
        return res.status(403).json({ error: 'You can only reference your own bookings' });
      }
    }

    // Create message
    const newMessage = new Message({
      sender_name,
      sender_email,
      sender_phone,
      subject,
      message,
      message_type,
      priority,
      related_booking,
      customer_id,
      source,
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
      referrer: req.get('Referer')
    });

    await newMessage.save();

    res.status(201).json({
      message: 'Message sent successfully',
      message_data: {
        id: newMessage._id,
        reference_number: newMessage.reference_number,
        status: newMessage.status,
        created_at: newMessage.created_at
      }
    });

  } catch (error) {
    console.error('Create message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/messages
// @desc    Get all messages (admin) or customer messages
// @access  Private/Public
router.get('/', [
  optionalAuth,
  [
    query('page', 'Page must be a positive integer').optional().isInt({ min: 1 }),
    query('limit', 'Limit must be between 1 and 100').optional().isInt({ min: 1, max: 100 }),
    query('status', 'Invalid message status').optional().isIn(['new', 'in_progress', 'resolved', 'closed', 'escalated']),
    query('message_type', 'Invalid message type').optional().isIn(['inquiry', 'complaint', 'feedback', 'support', 'booking_related', 'other']),
    query('priority', 'Invalid priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
    query('sender_email', 'Please include a valid email').optional().isEmail()
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
      message_type,
      priority,
      sender_email,
      search,
      assigned_to,
      start_date,
      end_date
    } = req.query;

    // Build query
    let query = {};

    // If not admin, only show messages for provided email
    if (!req.admin && sender_email) {
      query.sender_email = sender_email;
    } else if (!req.admin) {
      return res.status(401).json({ error: 'Authentication required or provide sender_email' });
    }

    // Apply filters (admin only)
    if (req.admin) {
      if (status) query.status = status;
      if (message_type) query.message_type = message_type;
      if (priority) query.priority = priority;
      if (assigned_to) query.assigned_to = assigned_to;
      if (start_date || end_date) {
        query.created_at = {};
        if (start_date) query.created_at.$gte = new Date(start_date);
        if (end_date) query.created_at.$lte = new Date(end_date);
      }
    }

    // Search functionality
    if (search) {
      query.$or = [
        { sender_name: { $regex: search, $options: 'i' } },
        { sender_email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const messages = await Message.find(query)
      .populate('assigned_to', 'name email')
      .populate('resolved_by', 'name email')
      .populate('related_booking', 'booking_reference service_type')
      .populate('responses.responder', 'name email')
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Message.countDocuments(query);

    // Add computed fields
    const messagesWithExtras = messages.map(message => ({
      ...message.toObject(),
      reference_number: message.reference_number,
      response_count: message.response_count,
      age_hours: message.age_hours,
      needs_attention: message.needsAttention()
    }));

    res.json({
      messages: messagesWithExtras,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(total / limit),
        total_items: total,
        items_per_page: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/messages/:id
// @desc    Get message by ID
// @access  Private/Public (with email verification)
router.get('/:id', [
  optionalAuth,
  query('sender_email', 'Sender email is required for non-admin access').optional().isEmail()
], async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('assigned_to', 'name email')
      .populate('resolved_by', 'name email')
      .populate('related_booking', 'booking_reference service_type pickup_location dropoff_location date_time')
      .populate('responses.responder', 'name email');

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // If not admin, verify sender email
    if (!req.admin) {
      const { sender_email } = req.query;
      if (!sender_email || message.sender_email !== sender_email) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }

    const messageData = {
      ...message.toObject(),
      reference_number: message.reference_number,
      response_count: message.response_count,
      age_hours: message.age_hours,
      public_responses: req.admin ? message.responses : message.public_responses
    };

    res.json({ message: messageData });

  } catch (error) {
    console.error('Get message error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid message ID' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/messages/:id
// @desc    Update message (admin only)
// @access  Private (Admin)
router.put('/:id', [
  auth,
  requirePermission('manage_customers'),
  [
    body('status', 'Invalid status').optional().isIn(['new', 'in_progress', 'resolved', 'closed', 'escalated']),
    body('priority', 'Invalid priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
    body('assigned_to', 'Invalid admin ID').optional().isMongoId(),
    body('resolution', 'Resolution cannot exceed 1000 characters').optional().isLength({ max: 1000 }),
    body('tags', 'Tags must be an array').optional().isArray()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const {
      status,
      priority,
      assigned_to,
      resolution,
      tags,
      is_spam,
      is_urgent
    } = req.body;

    // Update fields
    if (status) {
      message.status = status;
      if (status === 'resolved') {
        message.resolve(req.admin.id, resolution);
      }
    }
    if (priority) {
      message.priority = priority;
      if (priority === 'urgent') message.is_urgent = true;
    }
    if (assigned_to) {
      message.assignTo(assigned_to);
    }
    if (tags) message.tags = tags;
    if (is_spam !== undefined) message.is_spam = is_spam;
    if (is_urgent !== undefined) message.is_urgent = is_urgent;

    await message.save();

    const updatedMessage = await Message.findById(req.params.id)
      .populate('assigned_to', 'name email')
      .populate('resolved_by', 'name email');

    res.json({
      message: 'Message updated successfully',
      message_data: updatedMessage
    });

  } catch (error) {
    console.error('Update message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/messages/:id/responses
// @desc    Add response to message
// @access  Private (Admin)
router.post('/:id/responses', [
  auth,
  requirePermission('manage_customers'),
  [
    body('response_text', 'Response text is required').notEmpty().trim().isLength({ max: 2000 }),
    body('response_type', 'Invalid response type').optional().isIn(['reply', 'internal_note', 'escalation']),
    body('is_public', 'is_public must be boolean').optional().isBoolean()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const {
      response_text,
      response_type = 'reply',
      is_public = true
    } = req.body;

    // Add response
    const response = message.addResponse(
      req.admin.id,
      response_text,
      response_type,
      is_public
    );

    await message.save();

    const updatedMessage = await Message.findById(req.params.id)
      .populate('responses.responder', 'name email');

    res.status(201).json({
      message: 'Response added successfully',
      response: response,
      message_data: updatedMessage
    });

  } catch (error) {
    console.error('Add response error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/messages/:id/assign
// @desc    Assign message to admin
// @access  Private (Admin)
router.post('/:id/assign', [
  auth,
  requirePermission('manage_customers'),
  [
    body('admin_id', 'Admin ID is required').notEmpty().isMongoId()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const { admin_id } = req.body;

    // Assign message
    message.assignTo(admin_id);
    await message.save();

    const updatedMessage = await Message.findById(req.params.id)
      .populate('assigned_to', 'name email');

    res.json({
      message: 'Message assigned successfully',
      message_data: updatedMessage
    });

  } catch (error) {
    console.error('Assign message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/messages/:id/escalate
// @desc    Escalate message
// @access  Private (Admin)
router.post('/:id/escalate', [
  auth,
  requirePermission('manage_customers'),
  [
    body('escalation_note', 'Escalation note is required').notEmpty().trim().isLength({ max: 500 })
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const { escalation_note } = req.body;

    // Escalate message
    message.escalate(req.admin.id, escalation_note);
    await message.save();

    const updatedMessage = await Message.findById(req.params.id)
      .populate('assigned_to', 'name email')
      .populate('responses.responder', 'name email');

    res.json({
      message: 'Message escalated successfully',
      message_data: updatedMessage
    });

  } catch (error) {
    console.error('Escalate message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/messages/:id/satisfaction
// @desc    Submit customer satisfaction rating
// @access  Public (with email verification)
router.post('/:id/satisfaction', [
  [
    body('sender_email', 'Sender email is required').isEmail().normalizeEmail(),
    body('satisfaction_rating', 'Rating must be between 1 and 5').isInt({ min: 1, max: 5 }),
    body('satisfaction_feedback', 'Feedback cannot exceed 500 characters').optional().isLength({ max: 500 })
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const { sender_email, satisfaction_rating, satisfaction_feedback } = req.body;

    // Verify sender email
    if (message.sender_email !== sender_email) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Check if message is resolved
    if (message.status !== 'resolved') {
      return res.status(400).json({ error: 'Can only rate resolved messages' });
    }

    // Update satisfaction
    message.satisfaction_rating = satisfaction_rating;
    if (satisfaction_feedback) {
      message.satisfaction_feedback = satisfaction_feedback;
    }
    await message.save();

    res.json({ message: 'Thank you for your feedback!' });

  } catch (error) {
    console.error('Submit satisfaction error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/messages/stats/overview
// @desc    Get message statistics overview
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
      // Total messages
      Message.countDocuments(),
      
      // New messages today
      Message.countDocuments({ created_at: { $gte: startOfDay } }),
      
      // Messages by status
      Message.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      
      // Messages by priority
      Message.aggregate([
        { $group: { _id: '$priority', count: { $sum: 1 } } }
      ]),
      
      // Messages needing attention
      Message.getNeedingAttention().countDocuments(),
      
      // Average resolution time
      Message.aggregate([
        { $match: { status: 'resolved', resolution_time_minutes: { $exists: true } } },
        { $group: { _id: null, avg_resolution_time: { $avg: '$resolution_time_minutes' } } }
      ]),
      
      // Customer satisfaction average
      Message.aggregate([
        { $match: { satisfaction_rating: { $exists: true } } },
        { $group: { _id: null, avg_satisfaction: { $avg: '$satisfaction_rating' } } }
      ])
    ]);

    const statusBreakdown = {};
    stats[2].forEach(item => {
      statusBreakdown[item._id] = item.count;
    });

    const priorityBreakdown = {};
    stats[3].forEach(item => {
      priorityBreakdown[item._id] = item.count;
    });

    res.json({
      total_messages: stats[0],
      new_messages_today: stats[1],
      status_breakdown: statusBreakdown,
      priority_breakdown: priorityBreakdown,
      messages_needing_attention: stats[4],
      average_resolution_time_hours: stats[5][0]?.avg_resolution_time ? (stats[5][0].avg_resolution_time / 60).toFixed(1) : 0,
      average_satisfaction_rating: stats[6][0]?.avg_satisfaction || 0
    });

  } catch (error) {
    console.error('Get message stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/messages/needing-attention
// @desc    Get messages that need attention
// @access  Private (Admin)
router.get('/needing-attention', [
  auth,
  requirePermission('manage_customers')
], async (req, res) => {
  try {
    const messages = await Message.getNeedingAttention()
      .populate('assigned_to', 'name email')
      .populate('related_booking', 'booking_reference')
      .sort({ priority: -1, created_at: 1 })
      .limit(50);

    const messagesWithExtras = messages.map(message => ({
      ...message.toObject(),
      reference_number: message.reference_number,
      age_hours: message.age_hours
    }));

    res.json({
      messages: messagesWithExtras,
      count: messagesWithExtras.length
    });

  } catch (error) {
    console.error('Get messages needing attention error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/messages/:id
// @desc    Permanently delete a message (admin only)
// @access  Private (Admin)
router.delete('/:id', [
  auth,
  requirePermission('manage_customers')
], async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    await message.deleteOne();
    res.json({ message: 'Message deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;