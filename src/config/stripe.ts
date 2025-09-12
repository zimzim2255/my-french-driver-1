import { loadStripe } from '@stripe/stripe-js';
import { apiClient } from '../services/api';

// Stripe configuration interface
interface StripeConfig {
  publishable_key: string;
  currency: string;
  country: string;
}

// Global Stripe configuration
let stripeConfig: StripeConfig | null = null;
let stripePromiseInstance: Promise<any> | null = null;

// Fetch Stripe configuration from backend
export const getStripeConfig = async (): Promise<StripeConfig> => {
  if (stripeConfig) {
    return stripeConfig;
  }

  try {
    const response = await apiClient.get('/payments/config');
    stripeConfig = response.data;
    return stripeConfig;
  } catch (error) {
    console.error('Failed to fetch Stripe config:', error);
    // Fallback configuration (should not contain real keys)
    stripeConfig = {
      publishable_key: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
      currency: 'eur',
      country: 'FR'
    };
    return stripeConfig;
  }
};

// Initialize Stripe with dynamic configuration
export const getStripePromise = async () => {
  if (stripePromiseInstance) {
    return stripePromiseInstance;
  }

  const config = await getStripeConfig();
  stripePromiseInstance = loadStripe(config.publishable_key);
  return stripePromiseInstance;
};

// Legacy export for backward compatibility
export const STRIPE_CONFIG = {
  get publishableKey() {
    return stripeConfig?.publishable_key || '';
  },
  get currency() {
    return stripeConfig?.currency || 'eur';
  },
  get country() {
    return stripeConfig?.country || 'FR';
  }
};

// Initialize Stripe (will be replaced by getStripePromise)
export const stripePromise = getStripePromise();

// Stripe payment method types
export const PAYMENT_METHOD_TYPES = ['card'] as const;

// Stripe appearance configuration
export const STRIPE_APPEARANCE = {
  theme: 'stripe' as const,
  variables: {
    colorPrimary: '#eab308', // yellow-500
    colorBackground: '#ffffff',
    colorText: '#1f2937', // gray-800
    colorDanger: '#ef4444', // red-500
    fontFamily: 'system-ui, sans-serif',
    spacingUnit: '4px',
    borderRadius: '6px',
  },
  rules: {
    '.Input': {
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      padding: '12px',
      fontSize: '16px',
    },
    '.Input:focus': {
      borderColor: '#eab308',
      boxShadow: '0 0 0 2px rgba(234, 179, 8, 0.1)',
    },
    '.Label': {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '4px',
    },
  },
};

export default stripePromise;