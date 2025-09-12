const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization');

    // Check if no token
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    // Extract token from "Bearer TOKEN"
    const actualToken = token.split(' ')[1];

    try {
      // Verify token
      const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
      
      // Check if admin still exists and is active
      const admin = await Admin.findById(decoded.admin.id);
      if (!admin) {
        return res.status(401).json({ error: 'Token is not valid - admin not found' });
      }

      if (admin.status !== 'active') {
        return res.status(403).json({ error: 'Account is not active' });
      }

      // Add admin to request
      req.admin = decoded.admin;
      req.adminDoc = admin; // Full admin document if needed
      
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token has expired' });
      }
      return res.status(401).json({ error: 'Token is not valid' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Permission middleware factory
const requirePermission = (permission) => {
  return async (req, res, next) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Super admin has all permissions
      if (req.admin.role === 'super_admin') {
        return next();
      }

      // Check if admin has the required permission
      if (!req.admin.permissions || !req.admin.permissions.includes(permission)) {
        return res.status(403).json({ 
          error: `Access denied. Required permission: ${permission}` 
        });
      }

      next();
    } catch (error) {
      console.error('Permission middleware error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
};

// Role middleware factory
const requireRole = (roles) => {
  return async (req, res, next) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Ensure roles is an array
      const allowedRoles = Array.isArray(roles) ? roles : [roles];

      if (!allowedRoles.includes(req.admin.role)) {
        return res.status(403).json({ 
          error: `Access denied. Required role: ${allowedRoles.join(' or ')}` 
        });
      }

      next();
    } catch (error) {
      console.error('Role middleware error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
};

// Optional auth middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
      return next();
    }

    const actualToken = token.split(' ')[1];

    try {
      const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.admin.id);
      
      if (admin && admin.status === 'active') {
        req.admin = decoded.admin;
        req.adminDoc = admin;
      }
    } catch (err) {
      // Token invalid, but continue without auth
      console.log('Optional auth - invalid token:', err.message);
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next(); // Continue even if error
  }
};

module.exports = {
  auth,
  requirePermission,
  requireRole,
  optionalAuth
};