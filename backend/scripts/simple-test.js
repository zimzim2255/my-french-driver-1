const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function simpleTest() {
  try {
    console.log('Testing simple booking creation...\n');

    const bookingData = {
      customer_name: 'John Doe',
      customer_email: 'john@test.com',
      customer_phone: '0123456789',
      service_type: 'city_ride',
      pickup_location: 'Paris CDG Airport',
      dropoff_location: 'Eiffel Tower',
      date_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      base_price: 50
    };

    console.log('Sending booking data:', JSON.stringify(bookingData, null, 2));

    const response = await axios.post(`${BASE_URL}/bookings`, bookingData);
    
    console.log('✅ Success! Booking created:');
    console.log('ID:', response.data.booking._id);
    console.log('Reference:', response.data.booking_reference);
    console.log('Total Price:', response.data.booking.total_price);

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    if (error.response?.status) {
      console.error('Status:', error.response.status);
    }
  }
}

simpleTest();