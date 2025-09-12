const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Admin name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false // Don't include password in queries by default
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },

  // Role and Permissions
  role: {
    type: String,
    enum: ['super_admin', 'admin', 'manager', 'support'],
    default: 'admin'
  },
  permissions: [{
    type: String,
    enum: [
      'view_dashboard',
      'manage_bookings',
      'manage_customers',
      'manage_drivers',
      'manage_payments',
      'manage_fleet',
      'view_reports',
      'manage_users',
      'system_settings',
      'send_notifications'
    ]
  }],

  // Profile Information
  avatar: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true,
    maxlength: [100, 'Department cannot exceed 100 characters']
  },
  position: {
    type: String,
    trim: true,
    maxlength: [100, 'Position cannot exceed 100 characters']
  },

  // Account Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  two_factor_enabled: {
    type: Boolean,
    default: false
  },
  two_factor_secret: {
    type: String,
    select: false
  },

  // Login Information
  last_login: {
    type: Date
  },
  login_attempts: {
    type: Number,
    default: 0
  },
  locked_until: {
    type: Date
  },
  password_reset_token: {
    type: String,
    select: false
  },
  password_reset_expires: {
    type: Date,
    select: false
  },

  // Activity Tracking
  total_logins: {
    type: Number,
    default: 0
  },
  actions_performed: {
    type: Number,
    default: 0
  },
  last_action: {
    type: Date
  },

  // Preferences
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    },
    language: {
      type: String,
      enum: ['en', 'fr', 'es', 'de'],
      default: 'en'
    },
    timezone: {
      type: String,
      default: 'Europe/Paris'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      browser: {
        type: Boolean,
        default: true
      },
      new_bookings: {
        type: Boolean,
        default: true
      },
      payment_alerts: {
        type: Boolean,
        default: true
      },
      system_alerts: {
        type: Boolean,
        default: true
      }
    }
  },

  // Timestamps
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Indexes for better query performance
adminSchema.index({ email: 1 }, { unique: true });
adminSchema.index({ status: 1 });
adminSchema.index({ role: 1 });
adminSchema.index({ last_login: -1 });

// Virtual for account locked status
adminSchema.virtual('is_locked').get(function() {
  return !!(this.locked_until && this.locked_until > Date.now());
});

// Pre-save middleware to hash password
adminSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password
adminSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Method to check if admin has permission
adminSchema.methods.hasPermission = function(permission) {
  if (this.role === 'super_admin') return true;
  return this.permissions.includes(permission);
};

// Method to increment login attempts
adminSchema.methods.incrementLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.locked_until && this.locked_until < Date.now()) {
    return this.updateOne({
      $unset: { locked_until: 1 },
      $set: { login_attempts: 1 }
    });
  }
  
  const updates = { $inc: { login_attempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.login_attempts + 1 >= 5 && !this.is_locked) {
    updates.$set = { locked_until: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
adminSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { login_attempts: 1, locked_until: 1 }
  });
};

// Method to generate password reset token
adminSchema.methods.createPasswordResetToken = function() {
  const resetToken = require('crypto').randomBytes(32).toString('hex');
  
  this.password_reset_token = require('crypto')
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.password_reset_expires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Static method to get default permissions by role
adminSchema.statics.getDefaultPermissions = function(role) {
  const permissions = {
    super_admin: [
      'view_dashboard', 'manage_bookings', 'manage_customers', 'manage_drivers',
      'manage_payments', 'manage_fleet', 'view_reports', 'manage_users',
      'system_settings', 'send_notifications'
    ],
    admin: [
      'view_dashboard', 'manage_bookings', 'manage_customers', 'manage_drivers',
      'manage_payments', 'manage_fleet', 'view_reports', 'send_notifications'
    ],
    manager: [
      'view_dashboard', 'manage_bookings', 'manage_customers', 'manage_drivers',
      'view_reports'
    ],
    support: [
      'view_dashboard', 'manage_bookings', 'manage_customers'
    ]
  };
  
  return permissions[role] || [];
};

module.exports = mongoose.model('Admin', adminSchema);