import React, { useState, useEffect } from 'react';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { getStripePromise, STRIPE_APPEARANCE } from '../config/stripe';
import { stripeService } from '../services/stripe';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { CheckCircle, CreditCard, Lock, AlertCircle } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  currency: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
  bookingReference: string;
  onPaymentSuccess: (paymentIntent: any) => void;
  onPaymentError: (error: string) => void;
  disabled?: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  currency,
  customerInfo,
  bookingReference,
  onPaymentSuccess,
  onPaymentError,
  disabled = false,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [cardComplete, setCardComplete] = useState(false);

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const formattedAmount = await stripeService.formatAmount(amount, currency);
        const result = await stripeService.createPaymentIntent({
          amount: formattedAmount,
          currency,
          customer_email: customerInfo.email,
          customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          booking_reference: bookingReference,
          metadata: {
            phone: customerInfo.phone,
            special_requests: customerInfo.specialRequests || '',
          },
        });

        if (result.success && result.clientSecret) {
          setClientSecret(result.clientSecret);
        } else {
          setError(result.error || 'Failed to initialize payment');
          onPaymentError(result.error || 'Failed to initialize payment');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Payment initialization failed';
        setError(errorMessage);
        onPaymentError(errorMessage);
      }
    };

    if (customerInfo.email && bookingReference) {
      createPaymentIntent();
    }
  }, [amount, currency, customerInfo, bookingReference, onPaymentError]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setError('Payment system not ready. Please try again.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card information not found. Please refresh and try again.');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const result = await stripeService.confirmPayment(
        clientSecret,
        elements,
        cardElement,
        {
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          phone: customerInfo.phone,
        }
      );

      if (result.success && result.paymentIntent) {
        onPaymentSuccess(result.paymentIntent);
      } else {
        setError(result.error || 'Payment failed');
        onPaymentError(result.error || 'Payment failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment processing failed';
      setError(errorMessage);
      onPaymentError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937',
        fontFamily: 'system-ui, sans-serif',
        '::placeholder': {
          color: '#9ca3af',
        },
        iconColor: '#6b7280',
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
    hidePostalCode: false,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Security Notice */}
      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
        <Lock className="w-5 h-5 text-green-600" />
        <div className="text-sm">
          <div className="font-medium text-green-800">Secure Payment</div>
          <div className="text-green-700">Your payment information is encrypted and secure</div>
        </div>
      </div>

      {/* Card Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="w-5 h-5 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">Card Information</label>
        </div>
        
        <div className="p-4 border border-gray-300 rounded-lg bg-white">
          <CardElement
            options={cardElementOptions}
            onChange={(event) => {
              setCardComplete(event.complete);
              if (event.error) {
                setError(event.error.message);
              } else {
                setError('');
              }
            }}
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Payment Button */}
      <Button
        type="submit"
        className="w-full py-3 text-lg font-semibold"
        disabled={!stripe || !clientSecret || !cardComplete || processing || disabled}
      >
        {processing ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing Payment...
          </div>
        ) : (
          `Pay €${amount.toFixed(2)}`
        )}
      </Button>

      {/* Payment Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-600 pt-2">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>PCI Compliant</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>Instant Confirmation</span>
        </div>
      </div>
    </form>
  );
};

interface StripePaymentFormProps extends Omit<PaymentFormProps, 'bookingReference'> {
  bookingReference?: string;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = (props) => {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const bookingReference = props.bookingReference || stripeService.generateBookingReference();

  useEffect(() => {
    const initializeStripe = async () => {
      const promise = await getStripePromise();
      setStripePromise(promise);
    };
    
    initializeStripe();
  }, []);

  if (!stripePromise) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600">Loading payment system...</span>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ appearance: STRIPE_APPEARANCE }}>
      <PaymentForm {...props} bookingReference={bookingReference} />
    </Elements>
  );
};

export default StripePaymentForm;