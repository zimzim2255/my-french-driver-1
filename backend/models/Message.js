const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  // Sender Information
  sender_name: {
    type: String,
    required: [true, 'Sender name is required'],
    trim: true,
    maxlength: [100, 'Sender name cannot exceed 100 characters']
  },
  sender_email: {
    type: String,
    required: [true, 'Sender email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  sender_phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },

  // Message Content
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  message_type: {
    type: String,
    enum: ['inquiry', 'complaint', 'feedback', 'support', 'booking_related', 'other'],
    default: 'inquiry'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },

  // Related Information
  related_booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },

  // Status and Assignment
  status: {
    type: String,
    enum: ['new', 'in_progress', 'resolved', 'closed', 'escalated'],
    default: 'new'
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  assigned_at: {
    type: Date
  },

  // Response Information
  responses: [{
    responder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
    },
    response_text: {
      type: String,
      required: [true, 'Response text is required'],
      trim: true,
      maxlength: [2000, 'Response cannot exceed 2000 characters']
    },
    response_type: {
      type: String,
      enum: ['reply', 'internal_note', 'escalation'],
      default: 'reply'
    },
    is_public: {
      type: Boolean,
      default: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    attachments: [{
      filename: String,
      url: String,
      size: Number,
      mime_type: String
    }]
  }],

  // Tracking Information
  source: {
    type: String,
    enum: ['website', 'email', 'phone', 'admin_panel', 'mobile_app'],
    default: 'website'
  },
  ip_address: {
    type: String,
    trim: true
  },
  user_agent: {
    type: String,
    trim: true
  },
  referrer: {
    type: String,
    trim: true
  },

  // Resolution Information
  resolution: {
    type: String,
    trim: true,
    maxlength: [1000, 'Resolution cannot exceed 1000 characters']
  },
  resolved_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  resolved_at: {
    type: Date
  },
  resolution_time_minutes: {
    type: Number,
    min: [0, 'Resolution time cannot be negative']
  },

  // Customer Satisfaction
  satisfaction_rating: {
    type: Number,
    min: [1, 'Rating cannot be less than 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  satisfaction_feedback: {
    type: String,
    trim: true,
    maxlength: [500, 'Satisfaction feedback cannot exceed 500 characters']
  },

  // Flags and Tags
  is_spam: {
    type: Boolean,
    default: false
  },
  is_urgent: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }],

  // Attachments
  attachments: [{
    filename: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true
    },
    size: {
      type: Number,
      required: true,
      min: [0, 'File size cannot be negative']
    },
    mime_type: {
      type: String,
      required: true,
      trim: true
    },
    uploaded_at: {
      type: Date,
      default: Date.now
    }
  }],

  // Timestamps
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  last_activity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Indexes for better query performance
messageSchema.index({ sender_email: 1 });
messageSchema.index({ status: 1 });
messageSchema.index({ priority: 1 });
messageSchema.index({ message_type: 1 });
messageSchema.index({ assigned_to: 1 });
messageSchema.index({ created_at: -1 });
messageSchema.index({ resolved_at: 1 });
messageSchema.index({ customer_id: 1 });
messageSchema.index({ related_booking: 1 });

// Virtual for message reference number
messageSchema.virtual('reference_number').get(function() {
  return `MSG-${this._id.toString().slice(-8).toUpperCase()}`;
});

// Virtual for response count
messageSchema.virtual('response_count').get(function() {
  return this.responses ? this.responses.length : 0;
});

// Virtual for public responses only
messageSchema.virtual('public_responses').get(function() {
  return this.responses ? this.responses.filter(response => response.is_public) : [];
});

// Virtual for time since creation
messageSchema.virtual('age_hours').get(function() {
  return Math.floor((new Date() - this.created_at) / (1000 * 60 * 60));
});

// Method to add response
messageSchema.methods.addResponse = function(responderId, responseText, responseType = 'reply', isPublic = true) {
  const response = {
    responder: responderId,
    response_text: responseText,
    response_type: responseType,
    is_public: isPublic,
    created_at: new Date()
  };
  
  this.responses.push(response);
  this.last_activity = new Date();
  
  // Update status if it's the first response
  if (this.status === 'new') {
    this.status = 'in_progress';
  }
  
  return response;
};

// Method to assign message to admin
messageSchema.methods.assignTo = function(adminId) {
  this.assigned_to = adminId;
  this.assigned_at = new Date();
  this.last_activity = new Date();
  
  if (this.status === 'new') {
    this.status = 'in_progress';
  }
};

// Method to resolve message
messageSchema.methods.resolve = function(adminId, resolution) {
  this.status = 'resolved';
  this.resolved_by = adminId;
  this.resolved_at = new Date();
  this.resolution = resolution;
  this.last_activity = new Date();
  
  // Calculate resolution time in minutes
  this.resolution_time_minutes = Math.floor((this.resolved_at - this.created_at) / (1000 * 60));
};

// Method to escalate message
messageSchema.methods.escalate = function(adminId, escalationNote) {
  this.status = 'escalated';
  this.priority = this.priority === 'urgent' ? 'urgent' : 'high';
  this.is_urgent = true;
  this.last_activity = new Date();
  
  // Add escalation note as internal response
  this.addResponse(adminId, escalationNote, 'escalation', false);
};

// Method to check if message needs attention
messageSchema.methods.needsAttention = function() {
  const hoursOld = this.age_hours;
  
  if (this.priority === 'urgent' && hoursOld > 1) return true;
  if (this.priority === 'high' && hoursOld > 4) return true;
  if (this.priority === 'medium' && hoursOld > 24) return true;
  if (this.priority === 'low' && hoursOld > 72) return true;
  
  return false;
};

// Static method to get messages needing attention
messageSchema.statics.getNeedingAttention = function() {
  return this.find({
    status: { $in: ['new', 'in_progress'] },
    $or: [
      { priority: 'urgent', created_at: { $lt: new Date(Date.now() - 60 * 60 * 1000) } },
      { priority: 'high', created_at: { $lt: new Date(Date.now() - 4 * 60 * 60 * 1000) } },
      { priority: 'medium', created_at: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      { priority: 'low', created_at: { $lt: new Date(Date.now() - 72 * 60 * 60 * 1000) } }
    ]
  });
};

// Pre-save middleware to update last_activity
messageSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.last_activity = new Date();
  }
  next();
});

module.exports = mongoose.model('Message', messageSchema);