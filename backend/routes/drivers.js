const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Driver = require('../models/Driver');
const Booking = require('../models/Booking');
const { auth, requirePermission } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/drivers
// @desc    Get all drivers with pagination and filters
// @access  Private (Admin)
router.get('/', [
  auth,
  requirePermission('manage_drivers'),
  [
    query('page', 'Page must be a positive integer').optional().isInt({ min: 1 }),
    query('limit', 'Limit must be between 1 and 100').optional().isInt({ min: 1, max: 100 }),
    query('status', 'Invalid driver status').optional().isIn(['active', 'inactive', 'suspended', 'on_leave']),
    query('availability_status', 'Invalid availability status').optional().isIn(['available', 'busy', 'off_duty']),
    query('sort_by', 'Invalid sort field').optional().isIn(['name', 'email', 'total_rides', 'average_rating', 'created_at']),
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
      availability_status,
      search,
      sort_by = 'created_at',
      sort_order = 'desc',
      min_rating,
      vehicle_type
    } = req.query;

    // Build query
    let query = {};

    if (status) query.status = status;
    if (availability_status) query.availability_status = availability_status;
    if (min_rating) query.average_rating = { $gte: parseFloat(min_rating) };
    if (vehicle_type) query['vehicles.vehicle_type'] = vehicle_type;

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { license_number: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sortObj = {};
    sortObj[sort_by] = sort_order === 'asc' ? 1 : -1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const drivers = await Driver.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Driver.countDocuments(query);

    // Add computed fields
    const driversWithExtras = drivers.map(driver => ({
      ...driver.toObject(),
      primary_vehicle: driver.primary_vehicle,
      completion_rate: driver.completion_rate,
      cancellation_rate: driver.cancellation_rate
    }));

    res.json({
      drivers: driversWithExtras,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(total / limit),
        total_items: total,
        items_per_page: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get drivers error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/drivers/:id
// @desc    Get driver by ID
// @access  Private (Admin)
router.get('/:id', [
  auth,
  requirePermission('manage_drivers')
], async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    // Get driver's recent bookings
    const recentBookings = await Booking.find({ driver_assigned: driver._id })
      .sort({ created_at: -1 })
      .limit(10)
      .populate('customer_email', 'customer_name customer_phone');

    const driverData = {
      ...driver.toObject(),
      primary_vehicle: driver.primary_vehicle,
      completion_rate: driver.completion_rate,
      cancellation_rate: driver.cancellation_rate,
      recent_bookings: recentBookings
    };

    res.json({ driver: driverData });

  } catch (error) {
    console.error('Get driver error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid driver ID' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/drivers
// @desc    Create new driver
// @access  Private (Admin)
router.post('/', [
  auth,
  requirePermission('manage_drivers'),
  [
    body('name', 'Name is required').notEmpty().trim().isLength({ max: 100 }),
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('phone', 'Please include a valid phone number').isMobilePhone(),
    body('license_number', 'License number is required').notEmpty().trim().isLength({ max: 50 }),
    body('date_of_birth', 'Date of birth is required').isISO8601().toDate(),
    body('address.street', 'Street address is required').notEmpty().trim().isLength({ max: 200 }),
    body('address.city', 'City is required').notEmpty().trim().isLength({ max: 100 }),
    body('address.postal_code', 'Postal code is required').notEmpty().trim().isLength({ max: 20 }),
    body('experience_years', 'Experience years is required').isInt({ min: 0, max: 50 }),
    body('employment_type', 'Employment type is required').isIn(['full_time', 'part_time', 'contractor']),
    body('hourly_rate', 'Hourly rate is required').isFloat({ min: 10, max: 100 }),
    body('emergency_contact.name', 'Emergency contact name is required').notEmpty().trim(),
    body('emergency_contact.phone', 'Emergency contact phone is required').isMobilePhone(),
    body('emergency_contact.relationship', 'Emergency contact relationship is required').notEmpty().trim()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      phone,
      license_number,
      date_of_birth,
      address,
      experience_years,
      languages,
      specializations,
      employment_type,
      hourly_rate,
      commission_rate,
      emergency_contact,
      working_hours
    } = req.body;

    // Check if driver already exists
    let existingDriver = await Driver.findOne({ 
      $or: [{ email }, { license_number }] 
    });
    if (existingDriver) {
      return res.status(400).json({ 
        error: 'Driver with this email or license number already exists' 
      });
    }

    // Validate age
    const age = (new Date() - new Date(date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000);
    if (age < 21 || age > 70) {
      return res.status(400).json({ error: 'Driver must be between 21 and 70 years old' });
    }

    // Create new driver
    const driver = new Driver({
      name,
      email,
      phone,
      license_number,
      date_of_birth,
      address,
      experience_years,
      languages: languages || ['French'],
      specializations: specializations || [],
      employment_type,
      hourly_rate,
      commission_rate: commission_rate || 0.15,
      emergency_contact,
      working_hours: working_hours || {
        monday: { start: '08:00', end: '18:00', available: true },
        tuesday: { start: '08:00', end: '18:00', available: true },
        wednesday: { start: '08:00', end: '18:00', available: true },
        thursday: { start: '08:00', end: '18:00', available: true },
        friday: { start: '08:00', end: '18:00', available: true },
        saturday: { start: '09:00', end: '17:00', available: true },
        sunday: { start: '10:00', end: '16:00', available: false }
      }
    });

    await driver.save();

    res.status(201).json({
      message: 'Driver created successfully',
      driver
    });

  } catch (error) {
    console.error('Create driver error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/drivers/:id
// @desc    Update driver
// @access  Private (Admin)
router.put('/:id', [
  auth,
  requirePermission('manage_drivers'),
  [
    body('name', 'Name cannot exceed 100 characters').optional().trim().isLength({ max: 100 }),
    body('email', 'Please include a valid email').optional().isEmail().normalizeEmail(),
    body('phone', 'Please include a valid phone number').optional().isMobilePhone(),
    body('status', 'Invalid status').optional().isIn(['active', 'inactive', 'suspended', 'on_leave']),
    body('availability_status', 'Invalid availability status').optional().isIn(['available', 'busy', 'off_duty']),
    body('hourly_rate', 'Hourly rate must be between 10 and 100').optional().isFloat({ min: 10, max: 100 }),
    body('commission_rate', 'Commission rate must be between 0 and 1').optional().isFloat({ min: 0, max: 1 })
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    const {
      name,
      email,
      phone,
      address,
      status,
      availability_status,
      languages,
      specializations,
      hourly_rate,
      commission_rate,
      working_hours,
      emergency_contact
    } = req.body;

    // Check if email is being changed and if it already exists
    if (email && email !== driver.email) {
      const existingDriver = await Driver.findOne({ email });
      if (existingDriver) {
        return res.status(400).json({ error: 'Driver with this email already exists' });
      }
    }

    // Update fields
    if (name) driver.name = name;
    if (email) driver.email = email;
    if (phone) driver.phone = phone;
    if (address) driver.address = { ...driver.address, ...address };
    if (status) driver.status = status;
    if (availability_status) driver.availability_status = availability_status;
    if (languages) driver.languages = languages;
    if (specializations) driver.specializations = specializations;
    if (hourly_rate) driver.hourly_rate = hourly_rate;
    if (commission_rate !== undefined) driver.commission_rate = commission_rate;
    if (working_hours) driver.working_hours = { ...driver.working_hours, ...working_hours };
    if (emergency_contact) driver.emergency_contact = { ...driver.emergency_contact, ...emergency_contact };

    driver.last_active = new Date();
    await driver.save();

    res.json({
      message: 'Driver updated successfully',
      driver
    });

  } catch (error) {
    console.error('Update driver error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/drivers/:id
// @desc    Delete driver (soft delete - set status to inactive)
// @access  Private (Admin)
router.delete('/:id', [
  auth,
  requirePermission('manage_drivers')
], async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    // Check if driver has active bookings
    const activeBookings = await Booking.countDocuments({
      driver_assigned: driver._id,
      booking_status: { $in: ['confirmed', 'in_progress'] }
    });

    if (activeBookings > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete driver with active bookings. Please reassign or complete all active bookings first.' 
      });
    }

    // Soft delete - set status to inactive
    driver.status = 'inactive';
    await driver.save();

    res.json({ message: 'Driver deactivated successfully' });

  } catch (error) {
    console.error('Delete driver error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/drivers/:id/vehicles
// @desc    Add vehicle to driver
// @access  Private (Admin)
router.post('/:id/vehicles', [
  auth,
  requirePermission('manage_drivers'),
  [
    body('make', 'Vehicle make is required').notEmpty().trim().isLength({ max: 50 }),
    body('model', 'Vehicle model is required').notEmpty().trim().isLength({ max: 50 }),
    body('year', 'Vehicle year is required').isInt({ min: 2010, max: new Date().getFullYear() + 1 }),
    body('license_plate', 'License plate is required').notEmpty().trim().isLength({ max: 20 }),
    body('color', 'Vehicle color is required').notEmpty().trim().isLength({ max: 30 }),
    body('capacity', 'Vehicle capacity is required').isInt({ min: 1, max: 8 }),
    body('vehicle_type', 'Vehicle type is required').isIn(['sedan', 'suv', 'van', 'luxury', 'electric']),
    body('insurance_expiry', 'Insurance expiry date is required').isISO8601().toDate(),
    body('registration_expiry', 'Registration expiry date is required').isISO8601().toDate()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    const {
      make,
      model,
      year,
      license_plate,
      color,
      capacity,
      vehicle_type,
      insurance_expiry,
      registration_expiry,
      is_primary
    } = req.body;

    // Check if license plate already exists
    const existingVehicle = await Driver.findOne({ 
      'vehicles.license_plate': license_plate 
    });
    if (existingVehicle) {
      return res.status(400).json({ error: 'Vehicle with this license plate already exists' });
    }

    // If this is set as primary, unset other primary vehicles
    if (is_primary) {
      driver.vehicles.forEach(vehicle => {
        vehicle.is_primary = false;
      });
    }

    // Add vehicle
    const newVehicle = {
      make,
      model,
      year,
      license_plate,
      color,
      capacity,
      vehicle_type,
      insurance_expiry,
      registration_expiry,
      is_primary: is_primary || driver.vehicles.length === 0 // First vehicle is primary by default
    };

    driver.vehicles.push(newVehicle);
    await driver.save();

    res.status(201).json({
      message: 'Vehicle added successfully',
      vehicle: newVehicle
    });

  } catch (error) {
    console.error('Add vehicle error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/drivers/:id/vehicles/:vehicleId
// @desc    Update driver's vehicle
// @access  Private (Admin)
router.put('/:id/vehicles/:vehicleId', [
  auth,
  requirePermission('manage_drivers')
], async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    const vehicle = driver.vehicles.id(req.params.vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    const {
      make,
      model,
      year,
      license_plate,
      color,
      capacity,
      vehicle_type,
      insurance_expiry,
      registration_expiry,
      is_primary
    } = req.body;

    // Check if license plate is being changed and if it already exists
    if (license_plate && license_plate !== vehicle.license_plate) {
      const existingVehicle = await Driver.findOne({ 
        'vehicles.license_plate': license_plate 
      });
      if (existingVehicle) {
        return res.status(400).json({ error: 'Vehicle with this license plate already exists' });
      }
    }

    // If this is set as primary, unset other primary vehicles
    if (is_primary) {
      driver.vehicles.forEach(v => {
        if (v._id.toString() !== req.params.vehicleId) {
          v.is_primary = false;
        }
      });
    }

    // Update vehicle fields
    if (make) vehicle.make = make;
    if (model) vehicle.model = model;
    if (year) vehicle.year = year;
    if (license_plate) vehicle.license_plate = license_plate;
    if (color) vehicle.color = color;
    if (capacity) vehicle.capacity = capacity;
    if (vehicle_type) vehicle.vehicle_type = vehicle_type;
    if (insurance_expiry) vehicle.insurance_expiry = insurance_expiry;
    if (registration_expiry) vehicle.registration_expiry = registration_expiry;
    if (is_primary !== undefined) vehicle.is_primary = is_primary;

    await driver.save();

    res.json({
      message: 'Vehicle updated successfully',
      vehicle
    });

  } catch (error) {
    console.error('Update vehicle error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/drivers/:id/vehicles/:vehicleId
// @desc    Remove vehicle from driver
// @access  Private (Admin)
router.delete('/:id/vehicles/:vehicleId', [
  auth,
  requirePermission('manage_drivers')
], async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    const vehicle = driver.vehicles.id(req.params.vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Don't allow removing the last vehicle
    if (driver.vehicles.length === 1) {
      return res.status(400).json({ error: 'Cannot remove the last vehicle. Driver must have at least one vehicle.' });
    }

    // If removing primary vehicle, set another as primary
    if (vehicle.is_primary && driver.vehicles.length > 1) {
      const otherVehicle = driver.vehicles.find(v => v._id.toString() !== req.params.vehicleId);
      if (otherVehicle) {
        otherVehicle.is_primary = true;
      }
    }

    driver.vehicles.pull(req.params.vehicleId);
    await driver.save();

    res.json({ message: 'Vehicle removed successfully' });

  } catch (error) {
    console.error('Remove vehicle error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/drivers/available
// @desc    Get available drivers for a specific date/time
// @access  Private (Admin)
router.get('/available', [
  auth,
  requirePermission('manage_bookings'),
  [
    query('date_time', 'Date and time is required').isISO8601().toDate(),
    query('service_type', 'Service type is required').isIn(['city_ride', 'airport_pickup', 'train_pickup', 'other'])
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date_time, service_type } = req.query;
    const requestedDateTime = new Date(date_time);

    // Find active drivers
    let query = { 
      status: 'active',
      availability_status: 'available'
    };

    // Filter by specialization if needed
    if (service_type === 'airport_pickup') {
      query.specializations = 'airport_transfers';
    }

    const drivers = await Driver.find(query);

    // Filter drivers who are available at the requested time
    const availableDrivers = drivers.filter(driver => {
      return driver.isAvailableAt(requestedDateTime);
    });

    // Check for conflicting bookings
    const driversWithoutConflicts = [];
    for (const driver of availableDrivers) {
      const conflictingBookings = await Booking.countDocuments({
        driver_assigned: driver._id,
        booking_status: { $in: ['confirmed', 'in_progress'] },
        date_time: {
          $gte: new Date(requestedDateTime.getTime() - 2 * 60 * 60 * 1000), // 2 hours before
          $lte: new Date(requestedDateTime.getTime() + 2 * 60 * 60 * 1000)  // 2 hours after
        }
      });

      if (conflictingBookings === 0) {
        driversWithoutConflicts.push({
          ...driver.toObject(),
          primary_vehicle: driver.primary_vehicle,
          completion_rate: driver.completion_rate
        });
      }
    }

    res.json({
      available_drivers: driversWithoutConflicts,
      count: driversWithoutConflicts.length
    });

  } catch (error) {
    console.error('Get available drivers error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/drivers/stats/overview
// @desc    Get driver statistics overview
// @access  Private (Admin)
router.get('/stats/overview', [
  auth,
  requirePermission('view_dashboard')
], async (req, res) => {
  try {
    const stats = await Promise.all([
      // Total drivers
      Driver.countDocuments(),
      
      // Active drivers
      Driver.countDocuments({ status: 'active' }),
      
      // Available drivers
      Driver.countDocuments({ status: 'active', availability_status: 'available' }),
      
      // Busy drivers
      Driver.countDocuments({ status: 'active', availability_status: 'busy' }),
      
      // Average rating
      Driver.aggregate([
        { $group: { _id: null, avg_rating: { $avg: '$average_rating' } } }
      ]),
      
      // Top performers (by completion rate)
      Driver.find({ status: 'active', total_rides: { $gte: 10 } })
        .sort({ average_rating: -1, total_rides: -1 })
        .limit(5)
        .select('name email average_rating total_rides completion_rate')
    ]);

    res.json({
      total_drivers: stats[0],
      active_drivers: stats[1],
      available_drivers: stats[2],
      busy_drivers: stats[3],
      average_rating: stats[4][0]?.avg_rating || 0,
      top_performers: stats[5]
    });

  } catch (error) {
    console.error('Get driver stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;