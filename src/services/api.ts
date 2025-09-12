// API Configuration and Base Setup
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    items_per_page: number;
  };
}

// Booking Types
export interface BookingData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_type: 'city_ride' | 'airport_pickup' | 'train_pickup' | 'other';
  pickup_location: string;
  dropoff_location: string;
  date_time: string;
  base_price: number;
  additional_fees?: number;
  flight_number?: string;
  train_number?: string;
  special_requirements?: string;
}

export interface Booking extends BookingData {
  _id: string;
  booking_status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  total_price: number;
  currency: string;
  created_at: string;
  updated_at: string;
  booking_reference: string;
  driver_assigned?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
}

// Admin Types
export interface AdminLoginData {
  email: string;
  password: string;
}

export interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  status: string;
  created_at: string;
}

export interface LoginResponse {
  token: string;
  admin: Admin;
  message: string;
}

// HTTP Client Class
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('admin_token');
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('admin_token', token);
  }

  // Remove authentication token
  removeToken() {
    this.token = null;
    localStorage.removeItem('admin_token');
  }

  // Get authentication headers
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config: RequestInit = {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || data.message || 'An error occurred',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API Request Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; uptime: number }>> {
    return this.get('/health');
  }

  // Authentication Methods
  async login(credentials: AdminLoginData): Promise<ApiResponse<LoginResponse>> {
    const response = await this.post<LoginResponse>('/auth/login', credentials);
    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  async logout(): Promise<ApiResponse<{ message: string }>> {
    const response = await this.post<{ message: string }>('/auth/logout');
    this.removeToken();
    return response;
  }

  async getProfile(): Promise<ApiResponse<{ admin: Admin }>> {
    return this.get('/auth/me');
  }

  // Booking Methods
  async createBooking(bookingData: BookingData): Promise<ApiResponse<{
    booking: Booking;
    booking_reference: string;
    message: string;
  }>> {
    return this.post('/bookings', bookingData);
  }

  async getBookings(params?: {
    page?: number;
    limit?: number;
    status?: string;
    service_type?: string;
    customer_email?: string;
    search?: string;
  }): Promise<ApiResponse<{
    bookings: Booking[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_items: number;
      items_per_page: number;
    };
  }>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/bookings${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get(endpoint);
  }

  async getBooking(id: string, customerEmail?: string): Promise<ApiResponse<{ booking: Booking }>> {
    const params = customerEmail ? `?customer_email=${customerEmail}` : '';
    return this.get(`/bookings/${id}${params}`);
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<ApiResponse<{
    booking: Booking;
    message: string;
  }>> {
    return this.put(`/bookings/${id}`, updates);
  }

  async cancelBooking(id: string, customerEmail?: string): Promise<ApiResponse<{ message: string }>> {
    const params = customerEmail ? `?customer_email=${customerEmail}` : '';
    return this.delete(`/bookings/${id}${params}`);
  }

  // Dashboard Methods
  async getDashboard(): Promise<ApiResponse<any>> {
    return this.get('/admin/dashboard');
  }

  async getBookingStats(): Promise<ApiResponse<any>> {
    return this.get('/bookings/stats/overview');
  }

  // Customer Methods
  async getCustomers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/customers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get(endpoint);
  }

  // Message Methods
  async createMessage(messageData: {
    sender_name: string;
    sender_email: string;
    sender_phone?: string;
    subject: string;
    message: string;
    message_type?: string;
    related_booking?: string;
  }): Promise<ApiResponse<any>> {
    return this.post('/messages', messageData);
  }

  async getMessages(params?: {
    page?: number;
    limit?: number;
    status?: string;
    sender_email?: string;
  }): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/messages${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get(endpoint);
  }

  // Payment Methods
  async createPaymentIntent(paymentData: {
    amount: number;
    currency: string;
    customer_email: string;
    customer_name: string;
    booking_reference: string;
    metadata?: Record<string, string>;
  }): Promise<ApiResponse<{
    client_secret: string;
    payment_intent: any;
  }>> {
    return this.post('/payments/create-intent', paymentData);
  }

  async processPayment(paymentData: {
    paymentMethodId: string;
    amount: number;
    currency: string;
    customer_email: string;
    customer_name: string;
    booking_reference: string;
    metadata?: Record<string, string>;
  }): Promise<ApiResponse<{
    payment_intent: any;
    status: string;
  }>> {
    return this.post('/payments/process', paymentData);
  }

  async getPaymentStatus(paymentIntentId: string): Promise<ApiResponse<{
    payment_intent: any;
    status: string;
  }>> {
    return this.get(`/payments/status/${paymentIntentId}`);
  }

  async refundPayment(paymentIntentId: string, amount?: number): Promise<ApiResponse<{
    refund: any;
    status: string;
  }>> {
    return this.post(`/payments/refund/${paymentIntentId}`, { amount });
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export individual service functions for convenience
export const authService = {
  login: (credentials: AdminLoginData) => apiClient.login(credentials),
  logout: () => apiClient.logout(),
  getProfile: () => apiClient.getProfile(),
};

export const bookingService = {
  create: (data: BookingData) => apiClient.createBooking(data),
  getAll: (params?: any) => apiClient.getBookings(params),
  getById: (id: string, customerEmail?: string) => apiClient.getBooking(id, customerEmail),
  update: (id: string, updates: Partial<Booking>) => apiClient.updateBooking(id, updates),
  cancel: (id: string, customerEmail?: string) => apiClient.cancelBooking(id, customerEmail),
};

export const dashboardService = {
  getDashboard: () => apiClient.getDashboard(),
  getBookingStats: () => apiClient.getBookingStats(),
};

export const customerService = {
  getAll: (params?: any) => apiClient.getCustomers(params),
};

export const messageService = {
  create: (data: any) => apiClient.createMessage(data),
  getAll: (params?: any) => apiClient.getMessages(params),
};

export const paymentService = {
  createIntent: (data: any) => apiClient.createPaymentIntent(data),
  process: (data: any) => apiClient.processPayment(data),
  getStatus: (paymentIntentId: string) => apiClient.getPaymentStatus(paymentIntentId),
  refund: (paymentIntentId: string, amount?: number) => apiClient.refundPayment(paymentIntentId, amount),
};

export default apiClient;