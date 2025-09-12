const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing MyFrenchDriver API Endpoints...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data.status);
    console.log('   Uptime:', Math.floor(healthResponse.data.uptime), 'seconds\n');

    // Test 2: Admin Login
    console.log('2️⃣ Testing Admin Login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@myfrenchdriver.com',
      password: 'MyFrenchDriver2024!'
    });
    console.log('✅ Admin Login Successful');
    console.log('   Admin Name:', loginResponse.data.admin.name);
    console.log('   Role:', loginResponse.data.admin.role);
    
    const token = loginResponse.data.token;
    const authHeaders = { Authorization: `Bearer ${token}` };
    console.log('   Token received ✅\n');

    // Test 3: Get Admin Profile
    console.log('3️⃣ Testing Get Admin Profile...');
    const profileResponse = await axios.get(`${BASE_URL}/auth/me`, { headers: authHeaders });
    console.log('✅ Profile Retrieved');
    console.log('   Email:', profileResponse.data.admin.email);
    console.log('   Permissions:', profileResponse.data.admin.permissions.length, 'permissions\n');

    // Test 4: Create Test Booking (Public endpoint)
    console.log('4️⃣ Testing Create Booking...');
    const bookingData = {
      customer_name: 'Test Customer',
      customer_email: 'test@example.com',
      customer_phone: '0123456789',
      service_type: 'city_ride',
      pickup_location: 'Charles de Gaulle Airport',
      dropoff_location: 'Eiffel Tower',
      date_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      base_price: 45.50,
      special_requirements: 'Test booking from API'
    };

    const bookingResponse = await axios.post(`${BASE_URL}/bookings`, bookingData);
    console.log('✅ Booking Created');
    console.log('   Booking ID:', bookingResponse.data.booking._id);
    console.log('   Reference:', bookingResponse.data.booking_reference);
    console.log('   Customer:', bookingResponse.data.booking.customer_name);
    console.log('   Service:', bookingResponse.data.booking.service_type);
    console.log('   Total Price: €', bookingResponse.data.booking.total_price, '\n');

    // Test 5: Get Bookings (Admin)
    console.log('5️⃣ Testing Get Bookings (Admin)...');
    const bookingsResponse = await axios.get(`${BASE_URL}/bookings`, { headers: authHeaders });
    console.log('✅ Bookings Retrieved');
    console.log('   Total Bookings:', bookingsResponse.data.bookings.length);
    console.log('   Pagination:', bookingsResponse.data.pagination, '\n');

    // Test 6: Dashboard Stats
    console.log('6️⃣ Testing Dashboard Stats...');
    const dashboardResponse = await axios.get(`${BASE_URL}/admin/dashboard`, { headers: authHeaders });
    console.log('✅ Dashboard Data Retrieved');
    console.log('   Total Bookings:', dashboardResponse.data.overview.total_bookings);
    console.log('   Total Customers:', dashboardResponse.data.overview.total_customers);
    console.log('   Total Revenue: €', dashboardResponse.data.overview.total_revenue, '\n');

    console.log('🎉 ALL API TESTS PASSED! Backend is working perfectly!\n');
    console.log('📊 Summary:');
    console.log('   ✅ Server Health Check');
    console.log('   ✅ Admin Authentication');
    console.log('   ✅ JWT Token Validation');
    console.log('   ✅ Booking Creation');
    console.log('   ✅ Data Retrieval');
    console.log('   ��� Dashboard Statistics');
    console.log('   ✅ MongoDB Integration');

  } catch (error) {
    console.error('❌ API Test Failed:', error.response?.data || error.message);
    if (error.response?.status) {
      console.error('   Status Code:', error.response.status);
    }
  }
}

// Run tests
testAPI();