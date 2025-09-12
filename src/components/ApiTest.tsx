import React, { useState, useEffect } from 'react';
import { apiClient, bookingService, authService } from '../services/api';

const ApiTest: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<string>('Checking...');
  const [loginStatus, setLoginStatus] = useState<string>('Not logged in');
  const [bookingStatus, setBookingStatus] = useState<string>('Not tested');
  const [isLoading, setIsLoading] = useState(false);

  // Test health check on component mount
  useEffect(() => {
    testHealthCheck();
  }, []);

  const testHealthCheck = async () => {
    try {
      const response = await apiClient.healthCheck();
      if (response.success) {
        setHealthStatus(`✅ Connected - Uptime: ${Math.floor(response.data?.uptime || 0)}s`);
      } else {
        setHealthStatus(`❌ Failed: ${response.error}`);
      }
    } catch (error) {
      setHealthStatus(`❌ Error: ${error}`);
    }
  };

  const testLogin = async () => {
    setIsLoading(true);
    try {
      const response = await authService.login({
        email: 'admin@myfrenchdriver.com',
        password: 'MyFrenchDriver2024!'
      });

      if (response.success) {
        setLoginStatus(`✅ Logged in as: ${response.data?.admin.name} (${response.data?.admin.role})`);
      } else {
        setLoginStatus(`❌ Login failed: ${response.error}`);
      }
    } catch (error) {
      setLoginStatus(`❌ Login error: ${error}`);
    }
    setIsLoading(false);
  };

  const testBookingCreation = async () => {
    setIsLoading(true);
    try {
      const bookingData = {
        customer_name: 'Test Customer Frontend',
        customer_email: 'frontend-test@example.com',
        customer_phone: '0123456789',
        service_type: 'city_ride' as const,
        pickup_location: 'Frontend Test Pickup',
        dropoff_location: 'Frontend Test Dropoff',
        date_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        base_price: 75.50,
        special_requirements: 'Test booking from React frontend'
      };

      const response = await bookingService.create(bookingData);

      if (response.success) {
        setBookingStatus(`✅ Booking created: ${response.data?.booking_reference} - €${response.data?.booking.total_price}`);
      } else {
        setBookingStatus(`❌ Booking failed: ${response.error}`);
      }
    } catch (error) {
      setBookingStatus(`❌ Booking error: ${error}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">🧪 Frontend-Backend Connection Test</h2>
      
      <div className="space-y-4">
        {/* Health Check */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">1️⃣ Backend Health Check</h3>
          <p className="text-sm text-gray-600 mb-2">Testing connection to backend server...</p>
          <div className="bg-gray-100 p-2 rounded text-sm font-mono">
            {healthStatus}
          </div>
          <button 
            onClick={testHealthCheck}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Retest Health
          </button>
        </div>

        {/* Admin Login */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">2️⃣ Admin Authentication</h3>
          <p className="text-sm text-gray-600 mb-2">Testing admin login with JWT tokens...</p>
          <div className="bg-gray-100 p-2 rounded text-sm font-mono">
            {loginStatus}
          </div>
          <button 
            onClick={testLogin}
            disabled={isLoading}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Login'}
          </button>
        </div>

        {/* Booking Creation */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">3️⃣ Booking Creation</h3>
          <p className="text-sm text-gray-600 mb-2">Testing booking creation and data storage...</p>
          <div className="bg-gray-100 p-2 rounded text-sm font-mono">
            {bookingStatus}
          </div>
          <button 
            onClick={testBookingCreation}
            disabled={isLoading}
            className="mt-2 px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Test Booking'}
          </button>
        </div>

        {/* API Configuration */}
        <div className="p-4 border rounded-lg bg-blue-50">
          <h3 className="font-semibold mb-2">⚙️ API Configuration</h3>
          <div className="text-sm space-y-1">
            <p><strong>Backend URL:</strong> {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}</p>
            <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
            <p><strong>Dev Mode:</strong> {import.meta.env.VITE_DEV_MODE ? 'Enabled' : 'Disabled'}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-2">✅ What This Tests:</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Frontend can connect to backend server</li>
          <li>• API endpoints are responding correctly</li>
          <li>• Authentication system works with JWT</li>
          <li>• Data can be sent from frontend to backend</li>
          <li>• MongoDB database is storing real data</li>
          <li>• Error handling is working properly</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiTest;