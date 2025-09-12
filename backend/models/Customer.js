const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Customer name is required'],
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
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[0-9+\-\s()]{8,15}$/, 'Please enter a valid phone number']
  },

  // Additional Contact Information
  address: {
    street: {
      type: String,
      trim: true,
      maxlength: [200, 'Street address cannot exceed 200 characters']
    },
    city: {
      type: String,
      trim: true,
      maxlength: [100, 'City cannot exceed 100 characters']
    },
    postal_code: {
      type: String,
      trim: true,
      maxlength: [20, 'Postal code cannot exceed 20 characters']
    },
    country: {
      type: String,
      trim: true,
      maxlength: [100, 'Country cannot exceed 100 characters'],
      default: 'France'
    }
  },

  // Booking Statistics
  total_bookings: {
    type: Number,
    default: 0,
    min: [0, 'Total bookings cannot be negative']
  },
  completed_bookings: {
    type: Number,
    default: 0,
    min: [0, 'Completed bookings cannot be negative']
  },
  cancelled_bookings: {
    type: Number,
    default: 0,
    min: [0, 'Cancelled bookings cannot be negative']
  },
  total_spent: {
    type: Number,
    default: 0,
    min: [0, 'Total spent cannot be negative']
  },
  currency: {
    type: String,
    default: 'EUR',
    enum: ['EUR', 'USD', 'GBP']
  },

  // Stripe Information
  stripe_customer_id: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  link_account_id: {
    type: String,
    trim: true
  },
  preferred_payment_method: {
    type: String,
    enum: ['card', 'link'],
    default: 'card'
  },

  // Customer Preferences
  preferred_pickup_locations: [{
    name: {
      type: String,
      trim: true,
      maxlength: [200, 'Location name cannot exceed 200 characters']
    },
    address: {
      type: String,
      trim: true,
      maxlength: [300, 'Address cannot exceed 300 characters']
    }
  }],
  preferred_dropoff_locations: [{
    name: {
      type: String,
      trim: true,
      maxlength: [200, 'Location name cannot exceed 200 characters']
    },
    address: {
      type: String,
      trim: true,
      maxlength: [300, 'Address cannot exceed 300 characters']
    }
  }],
  special_requirements: {
    type: String,
    trim: true,
    maxlength: [500, 'Special requirements cannot exceed 500 characters']
  },

  // Customer Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'blocked'],
    default: 'active'
  },
  vip_status: {
    type: Boolean,
    default: false
  },
  loyalty_points: {
    type: Number,
    default: 0,
    min: [0, 'Loyalty points cannot be negative']
  },

  // Communication Preferences
  email_notifications: {
    type: Boolean,
    default: true
  },
  sms_notifications: {
    type: Boolean,
    default: false
  },
  marketing_emails: {
    type: Boolean,
    default: false
  },

  // Timestamps
  first_booking_date: {
    type: Date
  },
  last_booking_date: {
    type: Date
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Indexes for better query performance
customerSchema.index({ email: 1 }, { unique: true });
customerSchema.index({ phone: 1 });
customerSchema.index({ status: 1 });
customerSchema.index({ vip_status: 1 });
customerSchema.index({ total_spent: -1 });
customerSchema.index({ created_at: -1 });

// Virtual for customer display name
customerSchema.virtual('display_name').get(function() {
  return this.name || this.email;
});

// Virtual for customer tier based on total spent
customerSchema.virtual('customer_tier').get(function() {
  if (this.total_spent >= 5000) return 'Platinum';
  if (this.total_spent >= 2000) return 'Gold';
  if (this.total_spent >= 500) return 'Silver';
  return 'Bronze';
});

// Method to calculate customer lifetime value
customerSchema.methods.getLifetimeValue = function() {
  return {
    total_spent: this.total_spent,
    average_booking_value: this.total_bookings > 0 ? this.total_spent / this.total_bookings : 0,
    completion_rate: this.total_bookings > 0 ? (this.completed_bookings / this.total_bookings) * 100 : 0,
    cancellation_rate: this.total_bookings > 0 ? (this.cancelled_bookings / this.total_bookings) * 100 : 0
  };
};

// Method to add loyalty points
customerSchema.methods.addLoyaltyPoints = function(amount) {
  const pointsToAdd = Math.floor(amount / 10); // 1 point per 10 EUR spent
  this.loyalty_points += pointsToAdd;
  return pointsToAdd;
};

// Method to check VIP eligibility
customerSchema.methods.checkVipEligibility = function() {
  return this.total_spent >= 2000 || this.completed_bookings >= 20;
};

// Pre-save middleware to update VIP status
customerSchema.pre('save', function(next) {
  if (this.checkVipEligibility() && !this.vip_status) {
    this.vip_status = true;
  }
  next();
});

module.exports = mongoose.model('Customer', customerSchema);