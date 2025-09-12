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
export interface Booking {
  _id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_type: 'city_ride' | 'airport_pickup' | 'train_pickup' | 'other';
  pickup_location: string;
  dropoff_location: string;
  date_time: string;
  base_price: number;
  additional_fees?: number;
  total_price: number;
  currency: string;
  booking_status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  booking_reference: string;
  flight_number?: string;
  train_number?: string;
  special_requirements?: string;
  driver_assigned?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  admin_notes?: string;
  driver_notes?: string;
  created_at: string;
  updated_at: string;
  confirmed_at?: string;
  completed_at?: string;
}

// Customer Types
export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  total_bookings: number;
  completed_bookings: number;
  cancelled_bookings: number;
  total_spent: number;
  currency: string;
  status: 'active' | 'inactive' | 'blocked';
  vip_status: boolean;
  loyalty_points: number;
  first_booking_date?: string;
  last_booking_date?: string;
  created_at: string;
  updated_at: string;
}

// Admin Types
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

// Message Types
export interface Message {
  _id: string;
  sender_name: string;
  sender_email: string;
  sender_phone?: string;
  subject: string;
  message: string;
  message_type?: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
  related_booking?: string;
  admin_response?: string;
  responded_by?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}

// Dashboard Stats Types
export interface DashboardStats {
  total_bookings: number;
  today_bookings: number;
  week_bookings: number;
  month_bookings: number;
  pending_bookings: number;
  confirmed_bookings: number;
  completed_bookings: number;
  total_revenue: number;
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

      // Try to parse JSON, but fall back gracefully
      let data: any = null;
      try {
        data = await response.json();
      } catch (e) {
        // Non-JSON response
        data = null;
      }

      if (!response.ok) {
        const text = !data ? await response.text().catch(() => '') : '';
        const errorMsg = (data && (data.error || data.message)) || text || `${response.status} ${response.statusText}`;
        return {
          success: false,
          error: errorMsg,
        };
      }

      return {
        success: true,
        data: data as T,
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

  // Authentication Methods
  async login(credentials: { email: string; password: string }): Promise<ApiResponse<LoginResponse>> {
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

  // Dashboard Methods
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return this.get('/bookings/stats/overview');
  }

  // Booking Methods
  async getBookings(params?: {
    page?: number;
    limit?: number;
    status?: string;
    service_type?: string;
    customer_email?: string;
    search?: string;
    start_date?: string;
    end_date?: string;
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

  async getBooking(id: string): Promise<ApiResponse<{ booking: Booking }>> {
    return this.get(`/bookings/${id}`);
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<ApiResponse<{
    booking: Booking;
    message: string;
  }>> {
    return this.put(`/bookings/${id}`, updates);
  }

  async cancelBooking(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.delete(`/bookings/${id}`);
  }

  // Customer Methods
  async getCustomers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<ApiResponse<{
    customers: Customer[];
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
    
    const endpoint = `/customers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get(endpoint);
  }

  // Message Methods
  async getMessages(params?: {
    page?: number;
    limit?: number;
    status?: string;
    sender_email?: string;
  }): Promise<ApiResponse<{
    messages: Message[];
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
    
    const endpoint = `/messages${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get(endpoint);
  }

  async updateMessage(id: string, updates: Partial<Message>): Promise<ApiResponse<{
    message: Message;
    message: string;
  }>> {
    return this.put(`/messages/${id}`, updates);
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export individual service functions for convenience
export const authService = {
  login: (credentials: { email: string; password: string }) => apiClient.login(credentials),
  logout: () => apiClient.logout(),
  getProfile: () => apiClient.getProfile(),
};

export const dashboardService = {
  getStats: () => apiClient.getDashboardStats(),
};

export const bookingService = {
  getAll: (params?: any) => apiClient.getBookings(params),
  getById: (id: string) => apiClient.getBooking(id),
  update: (id: string, updates: Partial<Booking>) => apiClient.updateBooking(id, updates),
  cancel: (id: string) => apiClient.cancelBooking(id),
};

export const customerService = {
  getAll: (params?: any) => apiClient.getCustomers(params),
};

export const messageService = {
  getAll: (params?: any) => apiClient.getMessages(params),
  update: (id: string, updates: Partial<Message>) => apiClient.updateMessage(id, updates),
};

export default apiClient;