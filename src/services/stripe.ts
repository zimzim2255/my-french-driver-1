import { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { getStripePromise, getStripeConfig } from '../config/stripe';
import { apiClient } from './api';

export interface PaymentIntentData {
  amount: number; // in cents
  currency: string;
  customer_email: string;
  customer_name: string;
  booking_reference: string;
  metadata?: Record<string, string>;
}

export interface PaymentResult {
  success: boolean;
  paymentIntent?: any;
  error?: string;
  clientSecret?: string;
}

export interface StripePaymentData {
  paymentMethodId: string;
  amount: number;
  currency: string;
  customer_email: string;
  customer_name: string;
  booking_reference: string;
  metadata?: Record<string, string>;
}

class StripeService {
  private stripe: Stripe | null = null;

  async initialize(): Promise<Stripe | null> {
    if (!this.stripe) {
      this.stripe = await getStripePromise();
    }
    return this.stripe;
  }

  // Create payment intent on the backend
  async createPaymentIntent(data: PaymentIntentData): Promise<PaymentResult> {
    try {
      const response = await apiClient.post('/payments/create-intent', data);
      
      if (response.success && response.data) {
        return {
          success: true,
          clientSecret: response.data.client_secret,
          paymentIntent: response.data.payment_intent
        };
      } else {
        return {
          success: false,
          error: response.error || 'Failed to create payment intent'
        };
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment initialization failed'
      };
    }
  }

  // Confirm payment with Stripe Elements
  async confirmPayment(
    clientSecret: string,
    elements: StripeElements,
    cardElement: StripeCardElement,
    customerInfo: {
      name: string;
      email: string;
      phone?: string;
    }
  ): Promise<PaymentResult> {
    try {
      const stripe = await this.initialize();
      if (!stripe) {
        return {
          success: false,
          error: 'Stripe not initialized'
        };
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Payment failed'
        };
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        return {
          success: true,
          paymentIntent
        };
      } else {
        return {
          success: false,
          error: 'Payment was not completed successfully'
        };
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment confirmation failed'
      };
    }
  }

  // Process payment with payment method (alternative approach)
  async processPayment(data: StripePaymentData): Promise<PaymentResult> {
    try {
      const response = await apiClient.post('/payments/process', data);
      
      if (response.success && response.data) {
        return {
          success: true,
          paymentIntent: response.data.payment_intent
        };
      } else {
        return {
          success: false,
          error: response.error || 'Payment processing failed'
        };
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed'
      };
    }
  }

  // Retrieve payment intent status
  async retrievePaymentIntent(paymentIntentId: string): Promise<PaymentResult> {
    try {
      const stripe = await this.initialize();
      if (!stripe) {
        return {
          success: false,
          error: 'Stripe not initialized'
        };
      }

      const { paymentIntent, error } = await stripe.retrievePaymentIntent(paymentIntentId);

      if (error) {
        return {
          success: false,
          error: error.message || 'Failed to retrieve payment status'
        };
      }

      return {
        success: true,
        paymentIntent
      };
    } catch (error) {
      console.error('Error retrieving payment intent:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve payment status'
      };
    }
  }

  // Format amount for Stripe (convert to cents)
  async formatAmount(amount: number, currency?: string): Promise<number> {
    if (!currency) {
      const config = await getStripeConfig();
      currency = config.currency;
    }
    
    // For zero-decimal currencies (like JPY), don't multiply by 100
    const zeroDecimalCurrencies = ['bif', 'clp', 'djf', 'gnf', 'jpy', 'kmf', 'krw', 'mga', 'pyg', 'rwf', 'ugx', 'vnd', 'vuv', 'xaf', 'xof', 'xpf'];
    
    if (zeroDecimalCurrencies.includes(currency.toLowerCase())) {
      return Math.round(amount);
    }
    
    return Math.round(amount * 100);
  }

  // Format amount for display (convert from cents)
  async formatDisplayAmount(amount: number, currency?: string): Promise<number> {
    if (!currency) {
      const config = await getStripeConfig();
      currency = config.currency;
    }
    
    const zeroDecimalCurrencies = ['bif', 'clp', 'djf', 'gnf', 'jpy', 'kmf', 'krw', 'mga', 'pyg', 'rwf', 'ugx', 'vnd', 'vuv', 'xaf', 'xof', 'xpf'];
    
    if (zeroDecimalCurrencies.includes(currency.toLowerCase())) {
      return amount;
    }
    
    return amount / 100;
  }

  // Generate booking reference
  generateBookingReference(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `MFD-${timestamp}-${random}`.toUpperCase();
  }
}

export const stripeService = new StripeService();
export default stripeService;