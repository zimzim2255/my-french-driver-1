const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // Customer Information
  customer_name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    maxlength: [100, 'Customer name cannot exceed 100 characters']
  },
  customer_email: {
    type: String,
    required: [true, 'Customer email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  customer_phone: {
    type: String,
    required: [true, 'Customer phone is required'],
    trim: true,
    match: [/^[0-9+\-\s()]{8,15}$/, 'Please enter a valid phone number']
  },

  // Service Information
  service_type: {
    type: String,
    required: [true, 'Service type is required'],
    enum: {
      values: ['city_ride', 'airport_pickup', 'train_pickup', 'other'],
      message: 'Service type must be one of: city_ride, airport_pickup, train_pickup, other'
    }
  },
  pickup_location: {
    type: String,
    required: [true, 'Pickup location is required'],
    trim: true,
    maxlength: [200, 'Pickup location cannot exceed 200 characters']
  },
  dropoff_location: {
    type: String,
    required: [true, 'Drop-off location is required'],
    trim: true,
    maxlength: [200, 'Drop-off location cannot exceed 200 characters']
  },
  date_time: {
    type: Date,
    required: [true, 'Date and time is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Booking date must be in the future'
    }
  },

  // Optional Service-Specific Information
  flight_number: {
    type: String,
    trim: true,
    maxlength: [20, 'Flight number cannot exceed 20 characters'],
    required: function() {
      return this.service_type === 'airport_pickup';
    }
  },
  train_number: {
    type: String,
    trim: true,
    maxlength: [20, 'Train number cannot exceed 20 characters'],
    required: function() {
      return this.service_type === 'train_pickup';
    }
  },
  special_requirements: {
    type: String,
    trim: true,
    maxlength: [500, 'Special requirements cannot exceed 500 characters']
  },

  // Pricing Information
  base_price: {
    type: Number,
    required: [true, 'Base price is required'],
    min: [0, 'Price cannot be negative']
  },
  additional_fees: {
    type: Number,
    default: 0,
    min: [0, 'Additional fees cannot be negative']
  },
  total_price: {
    type: Number,
    min: [0, 'Total price cannot be negative']
  },
  currency: {
    type: String,
    default: 'EUR',
    enum: ['EUR', 'USD', 'GBP']
  },

  // Payment Information
  payment_status: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  stripe_payment_intent_id: {
    type: String,
    trim: true
  },
  stripe_customer_id: {
    type: String,
    trim: true
  },
  payment_method: {
    type: String,
    enum: ['card', 'link'],
    default: 'card'
  },

  // Booking Status
  booking_status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Driver Assignment
  driver_assigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  driver_notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Driver notes cannot exceed 500 characters']
  },

  // Admin Notes
  admin_notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Admin notes cannot exceed 1000 characters']
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
  confirmed_at: {
    type: Date
  },
  completed_at: {
    type: Date
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Indexes for better query performance
bookingSchema.index({ customer_email: 1 });
bookingSchema.index({ booking_status: 1 });
bookingSchema.index({ payment_status: 1 });
bookingSchema.index({ service_type: 1 });
bookingSchema.index({ date_time: 1 });
bookingSchema.index({ created_at: -1 });

// Virtual for booking reference number
bookingSchema.virtual('booking_reference').get(function() {
  return `MFD-${this._id.toString().slice(-8).toUpperCase()}`;
});

// Pre-save middleware to update total_price
bookingSchema.pre('save', function(next) {
  this.total_price = this.base_price + (this.additional_fees || 0);
  next();
});

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const bookingTime = new Date(this.date_time);
  const hoursUntilBooking = (bookingTime - now) / (1000 * 60 * 60);
  
  return hoursUntilBooking > 24 && 
         ['pending', 'confirmed'].includes(this.booking_status) &&
         this.payment_status !== 'refunded';
};

// Method to get service type display name
bookingSchema.methods.getServiceTypeDisplay = function() {
  const serviceTypes = {
    'city_ride': 'City Ride',
    'airport_pickup': 'Airport Pickup',
    'train_pickup': 'Train Pickup',
    'other': 'Other Service'
  };
  return serviceTypes[this.service_type] || this.service_type;
};

module.exports = mongoose.model('Booking', bookingSchema);