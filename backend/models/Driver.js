const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Driver name is required'],
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
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  license_number: {
    type: String,
    required: [true, 'License number is required'],
    trim: true,
    unique: true,
    maxlength: [50, 'License number cannot exceed 50 characters']
  },

  // Personal Details
  date_of_birth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function(value) {
        const age = (new Date() - value) / (365.25 * 24 * 60 * 60 * 1000);
        return age >= 21 && age <= 70;
      },
      message: 'Driver must be between 21 and 70 years old'
    }
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true,
      maxlength: [200, 'Street address cannot exceed 200 characters']
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      maxlength: [100, 'City cannot exceed 100 characters']
    },
    postal_code: {
      type: String,
      required: [true, 'Postal code is required'],
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

  // Vehicle Information
  vehicles: [{
    make: {
      type: String,
      required: [true, 'Vehicle make is required'],
      trim: true,
      maxlength: [50, 'Vehicle make cannot exceed 50 characters']
    },
    model: {
      type: String,
      required: [true, 'Vehicle model is required'],
      trim: true,
      maxlength: [50, 'Vehicle model cannot exceed 50 characters']
    },
    year: {
      type: Number,
      required: [true, 'Vehicle year is required'],
      min: [2010, 'Vehicle must be 2010 or newer'],
      max: [new Date().getFullYear() + 1, 'Invalid vehicle year']
    },
    license_plate: {
      type: String,
      required: [true, 'License plate is required'],
      trim: true,
      unique: true,
      maxlength: [20, 'License plate cannot exceed 20 characters']
    },
    color: {
      type: String,
      required: [true, 'Vehicle color is required'],
      trim: true,
      maxlength: [30, 'Color cannot exceed 30 characters']
    },
    capacity: {
      type: Number,
      required: [true, 'Vehicle capacity is required'],
      min: [1, 'Capacity must be at least 1'],
      max: [8, 'Capacity cannot exceed 8 passengers']
    },
    vehicle_type: {
      type: String,
      required: [true, 'Vehicle type is required'],
      enum: ['sedan', 'suv', 'van', 'luxury', 'electric']
    },
    is_primary: {
      type: Boolean,
      default: false
    },
    insurance_expiry: {
      type: Date,
      required: [true, 'Insurance expiry date is required']
    },
    registration_expiry: {
      type: Date,
      required: [true, 'Registration expiry date is required']
    }
  }],

  // Professional Information
  experience_years: {
    type: Number,
    required: [true, 'Experience years is required'],
    min: [0, 'Experience cannot be negative'],
    max: [50, 'Experience cannot exceed 50 years']
  },
  languages: [{
    type: String,
    enum: ['French', 'English', 'Spanish', 'German', 'Italian', 'Portuguese', 'Arabic', 'Chinese', 'Japanese', 'Russian']
  }],
  specializations: [{
    type: String,
    enum: ['airport_transfers', 'city_tours', 'business_travel', 'luxury_service', 'group_transport', 'medical_transport']
  }],

  // Employment Information
  employment_type: {
    type: String,
    required: [true, 'Employment type is required'],
    enum: ['full_time', 'part_time', 'contractor']
  },
  hire_date: {
    type: Date,
    required: [true, 'Hire date is required'],
    default: Date.now
  },
  hourly_rate: {
    type: Number,
    required: [true, 'Hourly rate is required'],
    min: [10, 'Hourly rate must be at least 10 EUR'],
    max: [100, 'Hourly rate cannot exceed 100 EUR']
  },
  commission_rate: {
    type: Number,
    default: 0.15,
    min: [0, 'Commission rate cannot be negative'],
    max: [1, 'Commission rate cannot exceed 100%']
  },

  // Status and Availability
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'on_leave'],
    default: 'active'
  },
  availability_status: {
    type: String,
    enum: ['available', 'busy', 'off_duty'],
    default: 'available'
  },
  working_hours: {
    monday: { start: String, end: String, available: { type: Boolean, default: true } },
    tuesday: { start: String, end: String, available: { type: Boolean, default: true } },
    wednesday: { start: String, end: String, available: { type: Boolean, default: true } },
    thursday: { start: String, end: String, available: { type: Boolean, default: true } },
    friday: { start: String, end: String, available: { type: Boolean, default: true } },
    saturday: { start: String, end: String, available: { type: Boolean, default: true } },
    sunday: { start: String, end: String, available: { type: Boolean, default: false } }
  },

  // Performance Metrics
  total_rides: {
    type: Number,
    default: 0,
    min: [0, 'Total rides cannot be negative']
  },
  completed_rides: {
    type: Number,
    default: 0,
    min: [0, 'Completed rides cannot be negative']
  },
  cancelled_rides: {
    type: Number,
    default: 0,
    min: [0, 'Cancelled rides cannot be negative']
  },
  total_earnings: {
    type: Number,
    default: 0,
    min: [0, 'Total earnings cannot be negative']
  },
  average_rating: {
    type: Number,
    default: 5.0,
    min: [1, 'Rating cannot be less than 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  total_ratings: {
    type: Number,
    default: 0,
    min: [0, 'Total ratings cannot be negative']
  },

  // Documents and Certifications
  documents: {
    license_photo: String,
    insurance_document: String,
    registration_document: String,
    background_check: String,
    medical_certificate: String
  },
  certifications: [{
    name: String,
    issuer: String,
    issue_date: Date,
    expiry_date: Date
  }],

  // Emergency Contact
  emergency_contact: {
    name: {
      type: String,
      required: [true, 'Emergency contact name is required'],
      trim: true,
      maxlength: [100, 'Emergency contact name cannot exceed 100 characters']
    },
    phone: {
      type: String,
      required: [true, 'Emergency contact phone is required'],
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    },
    relationship: {
      type: String,
      required: [true, 'Relationship is required'],
      trim: true,
      maxlength: [50, 'Relationship cannot exceed 50 characters']
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
  last_active: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Indexes for better query performance
driverSchema.index({ email: 1 }, { unique: true });
driverSchema.index({ license_number: 1 }, { unique: true });
driverSchema.index({ status: 1 });
driverSchema.index({ availability_status: 1 });
driverSchema.index({ average_rating: -1 });
driverSchema.index({ total_rides: -1 });
driverSchema.index({ 'vehicles.license_plate': 1 });

// Virtual for driver's primary vehicle
driverSchema.virtual('primary_vehicle').get(function() {
  return this.vehicles.find(vehicle => vehicle.is_primary) || this.vehicles[0];
});

// Virtual for completion rate
driverSchema.virtual('completion_rate').get(function() {
  return this.total_rides > 0 ? (this.completed_rides / this.total_rides) * 100 : 0;
});

// Virtual for cancellation rate
driverSchema.virtual('cancellation_rate').get(function() {
  return this.total_rides > 0 ? (this.cancelled_rides / this.total_rides) * 100 : 0;
});

// Method to check if driver is available at a specific time
driverSchema.methods.isAvailableAt = function(dateTime) {
  if (this.status !== 'active' || this.availability_status !== 'available') {
    return false;
  }
  
  const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dateTime.getDay()];
  const workingHours = this.working_hours[dayOfWeek];
  
  if (!workingHours.available) {
    return false;
  }
  
  // Additional logic for checking specific time slots can be added here
  return true;
};

// Method to calculate earnings for a period
driverSchema.methods.calculateEarnings = function(startDate, endDate) {
  // This would typically involve aggregating booking data
  // For now, return basic calculation
  return {
    total_earnings: this.total_earnings,
    commission_earned: this.total_earnings * this.commission_rate,
    net_earnings: this.total_earnings * (1 - this.commission_rate)
  };
};

// Method to update rating
driverSchema.methods.updateRating = function(newRating) {
  const totalScore = this.average_rating * this.total_ratings + newRating;
  this.total_ratings += 1;
  this.average_rating = totalScore / this.total_ratings;
  return this.average_rating;
};

module.exports = mongoose.model('Driver', driverSchema);