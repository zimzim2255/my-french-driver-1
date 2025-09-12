const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

async function createInitialAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Check if any admin exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log('❌ Admin user already exists:', existingAdmin.email);
      process.exit(0);
    }

    // Create initial super admin
    const initialAdmin = new Admin({
      name: 'Super Admin',
      email: process.env.ADMIN_EMAIL || 'admin@myfrenchdriver.com',
      password: process.env.ADMIN_PASSWORD || 'MyFrenchDriver2024!',
      role: 'super_admin',
      status: 'active',
      is_verified: true,
      permissions: Admin.getDefaultPermissions('super_admin'),
      department: 'Administration',
      position: 'System Administrator'
    });

    await initialAdmin.save();
    console.log('✅ Initial admin user created successfully!');
    console.log('📧 Email:', initialAdmin.email);
    console.log('🔑 Password:', process.env.ADMIN_PASSWORD || 'MyFrenchDriver2024!');
    console.log('👑 Role:', initialAdmin.role);

  } catch (error) {
    console.error('❌ Error creating initial admin:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

createInitialAdmin();