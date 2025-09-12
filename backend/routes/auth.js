const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new admin (super admin only)
// @access  Private (Super Admin)
router.post('/register', 
  auth,
  [
    body('name', 'Name is required').notEmpty().trim().isLength({ max: 100 }),
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
    body('role', 'Role is required').isIn(['super_admin', 'admin', 'manager', 'support'])
  ],
  async (req, res) => {
  try {
    // Check if user is super admin
    if (req.admin.role !== 'super_admin') {
      return res.status(403).json({ error: 'Access denied. Super admin required.' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, phone, department, position } = req.body;

    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    // Create new admin
    admin = new Admin({
      name,
      email,
      password,
      role,
      phone,
      department,
      position,
      permissions: Admin.getDefaultPermissions(role),
      created_by: req.admin.id
    });

    await admin.save();

    // Remove password from response
    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.status(201).json({
      message: 'Admin created successfully',
      admin: adminResponse
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Login admin
// @access  Public
router.post('/login', [
  body('email', 'Please include a valid email').isEmail().normalizeEmail(),
  body('password', 'Password is required').exists()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if admin exists
    let admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if account is locked
    if (admin.is_locked) {
      return res.status(423).json({ 
        error: 'Account temporarily locked due to too many failed login attempts' 
      });
    }

    // Check if account is active
    if (admin.status !== 'active') {
      return res.status(403).json({ error: 'Account is not active' });
    }

    // Validate password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      await admin.incrementLoginAttempts();
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Reset login attempts on successful login
    if (admin.login_attempts > 0) {
      await admin.resetLoginAttempts();
    }

    // Update login information
    admin.last_login = new Date();
    admin.total_logins += 1;
    await admin.save();

    // Create JWT payload
    const payload = {
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions
      }
    };

    // Sign JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
      (err, token) => {
        if (err) throw err;

        // Remove sensitive data from response
        const adminResponse = admin.toObject();
        delete adminResponse.password;
        delete adminResponse.two_factor_secret;
        delete adminResponse.password_reset_token;
        delete adminResponse.password_reset_expires;

        res.json({
          token,
          admin: adminResponse,
          message: 'Login successful'
        });
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current admin
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ admin });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update admin profile
// @access  Private
router.put('/profile', 
  auth,
  [
    body('name', 'Name is required').optional().notEmpty().trim().isLength({ max: 100 }),
    body('phone', 'Please include a valid phone number').optional().isMobilePhone(),
    body('department', 'Department cannot exceed 100 characters').optional().isLength({ max: 100 }),
    body('position', 'Position cannot exceed 100 characters').optional().isLength({ max: 100 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, department, position, preferences } = req.body;

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Update fields
    if (name) admin.name = name;
    if (phone) admin.phone = phone;
    if (department) admin.department = department;
    if (position) admin.position = position;
    if (preferences) admin.preferences = { ...admin.preferences, ...preferences };

    await admin.save();

    res.json({
      message: 'Profile updated successfully',
      admin
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/auth/change-password
// @desc    Change admin password
// @access  Private
router.put('/change-password', 
  auth,
  [
    body('currentPassword', 'Current password is required').exists(),
    body('newPassword', 'New password must be at least 8 characters').isLength({ min: 8 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin.id).select('+password');
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Verify current password
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.json({ message: 'Password changed successfully' });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Request password reset
// @access  Public
router.post('/forgot-password', [
  body('email', 'Please include a valid email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      // Don't reveal if email exists or not
      return res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    // Generate reset token
    const resetToken = admin.createPasswordResetToken();
    await admin.save();

    // TODO: Send email with reset token
    // For now, just return success message
    console.log(`Password reset token for ${email}: ${resetToken}`);

    res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password', [
  body('token', 'Reset token is required').notEmpty(),
  body('password', 'Password must be at least 8 characters').isLength({ min: 8 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, password } = req.body;

    // Hash the token to compare with stored hash
    const hashedToken = require('crypto')
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const admin = await Admin.findOne({
      password_reset_token: hashedToken,
      password_reset_expires: { $gt: Date.now() }
    }).select('+password_reset_token +password_reset_expires');

    if (!admin) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Update password and clear reset token
    admin.password = password;
    admin.password_reset_token = undefined;
    admin.password_reset_expires = undefined;
    await admin.save();

    res.json({ message: 'Password reset successful' });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout admin (client-side token removal)
// @access  Private
router.post('/logout', auth, async (req, res) => {
  try {
    // Update last action time
    await Admin.findByIdAndUpdate(req.admin.id, {
      last_action: new Date()
    });

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;