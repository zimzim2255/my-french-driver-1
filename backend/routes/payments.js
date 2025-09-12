const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');
const { auth, requirePermission, optionalAuth } = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

// @route   GET /api/payments/config
// @desc    Get Stripe publishable key and configuration
// @access  Public
router.get('/config', (req, res) => {
  try {
    res.json({
      publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
      currency: 'eur',
      country: 'FR'
    });
  } catch (error) {
    console.error('Get Stripe config error:', error);
    res.status(500).json({ error: 'Failed to get Stripe configuration' });
  }
});

// @route   POST /api/payments/create-payment-intent
// @desc    Create Stripe payment intent for booking
// @access  Public
router.post('/create-payment-intent', [
  [
    body('booking_id', 'Booking ID is required').notEmpty().isMongoId(),
    body('customer_email', 'Customer email is required').isEmail().normalizeEmail(),
    body('payment_method_type', 'Payment method type is required').isIn(['card', 'link'])
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { booking_id, customer_email, payment_method_type } = req.body;

    // Find booking
    const booking = await Booking.findById(booking_id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Verify customer email
    if (booking.customer_email !== customer_email) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Check if booking is already paid
    if (booking.payment_status === 'paid') {
      return res.status(400).json({ error: 'Booking is already paid' });
    }

    // Find or create Stripe customer
    let customer = await Customer.findOne({ email: customer_email });
    let stripeCustomer;

    if (customer && customer.stripe_customer_id) {
      try {
        stripeCustomer = await stripe.customers.retrieve(customer.stripe_customer_id);
      } catch (error) {
        console.log('Stripe customer not found, creating new one');
        stripeCustomer = null;
      }
    }

    if (!stripeCustomer) {
      stripeCustomer = await stripe.customers.create({
        email: customer_email,
        name: booking.customer_name,
        phone: booking.customer_phone,
        metadata: {
          customer_id: customer ? customer._id.toString() : 'new'
        }
      });

      // Update customer with Stripe ID
      if (customer) {
        customer.stripe_customer_id = stripeCustomer.id;
        await customer.save();
      }
    }

    // Create payment intent
    const paymentIntentData = {
      amount: Math.round(booking.total_price * 100), // Convert to cents
      currency: booking.currency.toLowerCase(),
      customer: stripeCustomer.id,
      metadata: {
        booking_id: booking._id.toString(),
        customer_email: customer_email,
        service_type: booking.service_type,
        booking_reference: booking.booking_reference
      },
      description: `MyFrenchDriver - ${booking.getServiceTypeDisplay()} - ${booking.booking_reference}`,
      receipt_email: customer_email
    };

    // Configure payment methods based on type
    if (payment_method_type === 'link') {
      paymentIntentData.payment_method_types = ['card', 'link'];
      paymentIntentData.automatic_payment_methods = {
        enabled: true,
        allow_redirects: 'never'
      };
    } else {
      paymentIntentData.payment_method_types = ['card'];
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);

    // Update booking with payment intent ID
    booking.stripe_payment_intent_id = paymentIntent.id;
    booking.stripe_customer_id = stripeCustomer.id;
    booking.payment_method = payment_method_type;
    await booking.save();

    res.json({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
      customer_id: stripeCustomer.id,
      amount: booking.total_price,
      currency: booking.currency
    });

  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// @route   POST /api/payments/create-checkout-session
// @desc    Create Stripe checkout session for booking
// @access  Public
router.post('/create-checkout-session', [
  [
    body('booking_id', 'Booking ID is required').notEmpty().isMongoId(),
    body('customer_email', 'Customer email is required').isEmail().normalizeEmail(),
    body('success_url', 'Success URL is required').isURL(),
    body('cancel_url', 'Cancel URL is required').isURL()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { booking_id, customer_email, success_url, cancel_url } = req.body;

    // Find booking
    const booking = await Booking.findById(booking_id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Verify customer email
    if (booking.customer_email !== customer_email) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Check if booking is already paid
    if (booking.payment_status === 'paid') {
      return res.status(400).json({ error: 'Booking is already paid' });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link'],
      line_items: [
        {
          price_data: {
            currency: booking.currency.toLowerCase(),
            product_data: {
              name: `${booking.getServiceTypeDisplay()} - ${booking.booking_reference}`,
              description: `From: ${booking.pickup_location}\nTo: ${booking.dropoff_location}\nDate: ${new Date(booking.date_time).toLocaleString()}`,
              metadata: {
                booking_id: booking._id.toString(),
                service_type: booking.service_type
              }
            },
            unit_amount: Math.round(booking.total_price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}&booking_id=${booking_id}`,
      cancel_url: cancel_url,
      customer_email: customer_email,
      metadata: {
        booking_id: booking._id.toString(),
        customer_email: customer_email,
        service_type: booking.service_type
      },
      payment_intent_data: {
        metadata: {
          booking_id: booking._id.toString(),
          customer_email: customer_email,
          service_type: booking.service_type,
          booking_reference: booking.booking_reference
        }
      }
    });

    res.json({
      checkout_url: session.url,
      session_id: session.id
    });

  } catch (error) {
    console.error('Create checkout session error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// @route   POST /api/payments/webhook
// @desc    Handle Stripe webhooks
// @access  Public (Stripe)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;
      
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      
      case 'payment_intent.canceled':
        await handlePaymentIntentCanceled(event.data.object);
        break;
      
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

// Helper function to handle successful payment
async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    const booking = await Booking.findOne({ 
      stripe_payment_intent_id: paymentIntent.id 
    });

    if (!booking) {
      console.error('Booking not found for payment intent:', paymentIntent.id);
      return;
    }

    // Update booking status
    booking.payment_status = 'paid';
    if (booking.booking_status === 'pending') {
      booking.booking_status = 'confirmed';
      booking.confirmed_at = new Date();
    }
    await booking.save();

    // Update customer
    const customer = await Customer.findOne({ email: booking.customer_email });
    if (customer) {
      customer.total_spent += booking.total_price;
      customer.addLoyaltyPoints(booking.total_price);
      await customer.save();
    }

    console.log(`Payment succeeded for booking ${booking.booking_reference}`);
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

// Helper function to handle failed payment
async function handlePaymentIntentFailed(paymentIntent) {
  try {
    const booking = await Booking.findOne({ 
      stripe_payment_intent_id: paymentIntent.id 
    });

    if (!booking) {
      console.error('Booking not found for payment intent:', paymentIntent.id);
      return;
    }

    booking.payment_status = 'failed';
    await booking.save();

    console.log(`Payment failed for booking ${booking.booking_reference}`);
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

// Helper function to handle completed checkout session
async function handleCheckoutSessionCompleted(session) {
  try {
    const bookingId = session.metadata.booking_id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      console.error('Booking not found for checkout session:', session.id);
      return;
    }

    // Get payment intent from session
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
    
    booking.stripe_payment_intent_id = paymentIntent.id;
    booking.payment_status = 'paid';
    if (booking.booking_status === 'pending') {
      booking.booking_status = 'confirmed';
      booking.confirmed_at = new Date();
    }
    await booking.save();

    console.log(`Checkout completed for booking ${booking.booking_reference}`);
  } catch (error) {
    console.error('Error handling checkout completion:', error);
  }
}

// Helper function to handle canceled payment
async function handlePaymentIntentCanceled(paymentIntent) {
  try {
    const booking = await Booking.findOne({ 
      stripe_payment_intent_id: paymentIntent.id 
    });

    if (!booking) {
      console.error('Booking not found for payment intent:', paymentIntent.id);
      return;
    }

    booking.payment_status = 'failed';
    await booking.save();

    console.log(`Payment canceled for booking ${booking.booking_reference}`);
  } catch (error) {
    console.error('Error handling payment cancellation:', error);
  }
}

// @route   GET /api/payments/verify/:booking_id
// @desc    Verify payment status for booking
// @access  Public (with email verification)
router.get('/verify/:booking_id', [
  [
    body('customer_email', 'Customer email is required').isEmail().normalizeEmail()
  ]
], async (req, res) => {
  try {
    const { customer_email } = req.query;
    
    if (!customer_email) {
      return res.status(400).json({ error: 'Customer email is required' });
    }

    const booking = await Booking.findById(req.params.booking_id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Verify customer email
    if (booking.customer_email !== customer_email) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // If we have a payment intent, check its status with Stripe
    if (booking.stripe_payment_intent_id) {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          booking.stripe_payment_intent_id
        );

        // Update booking status based on Stripe status
        if (paymentIntent.status === 'succeeded' && booking.payment_status !== 'paid') {
          booking.payment_status = 'paid';
          if (booking.booking_status === 'pending') {
            booking.booking_status = 'confirmed';
            booking.confirmed_at = new Date();
          }
          await booking.save();
        }
      } catch (stripeError) {
        console.error('Error retrieving payment intent:', stripeError);
      }
    }

    res.json({
      booking_id: booking._id,
      payment_status: booking.payment_status,
      booking_status: booking.booking_status,
      total_price: booking.total_price,
      currency: booking.currency,
      booking_reference: booking.booking_reference
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/payments/refund
// @desc    Process refund for booking
// @access  Private (Admin)
router.post('/refund', [
  auth,
  requirePermission('manage_payments'),
  [
    body('booking_id', 'Booking ID is required').notEmpty().isMongoId(),
    body('amount', 'Refund amount is required').optional().isFloat({ min: 0 }),
    body('reason', 'Refund reason is required').notEmpty().trim()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { booking_id, amount, reason } = req.body;

    const booking = await Booking.findById(booking_id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Booking is not paid, cannot refund' });
    }

    if (!booking.stripe_payment_intent_id) {
      return res.status(400).json({ error: 'No payment intent found for this booking' });
    }

    // Calculate refund amount (full refund if not specified)
    const refundAmount = amount ? Math.round(amount * 100) : Math.round(booking.total_price * 100);

    // Create refund in Stripe
    const refund = await stripe.refunds.create({
      payment_intent: booking.stripe_payment_intent_id,
      amount: refundAmount,
      reason: 'requested_by_customer',
      metadata: {
        booking_id: booking._id.toString(),
        admin_id: req.admin.id,
        reason: reason
      }
    });

    // Update booking status
    booking.payment_status = 'refunded';
    booking.booking_status = 'cancelled';
    booking.admin_notes = `${booking.admin_notes || ''}\nRefund processed: ${reason}`.trim();
    await booking.save();

    // Update customer statistics
    const customer = await Customer.findOne({ email: booking.customer_email });
    if (customer) {
      customer.total_spent -= (refundAmount / 100);
      customer.cancelled_bookings += 1;
      await customer.save();
    }

    res.json({
      message: 'Refund processed successfully',
      refund_id: refund.id,
      refund_amount: refundAmount / 100,
      currency: booking.currency
    });

  } catch (error) {
    console.error('Process refund error:', error);
    if (error.type === 'StripeCardError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to process refund' });
  }
});

// @route   GET /api/payments/stats
// @desc    Get payment statistics
// @access  Private (Admin)
router.get('/stats', [
  auth,
  requirePermission('view_reports')
], async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const stats = await Promise.all([
      // Total revenue
      Booking.aggregate([
        { $match: { payment_status: 'paid' } },
        { $group: { _id: null, total: { $sum: '$total_price' } } }
      ]),
      
      // Today's revenue
      Booking.aggregate([
        { $match: { payment_status: 'paid', created_at: { $gte: startOfDay } } },
        { $group: { _id: null, total: { $sum: '$total_price' } } }
      ]),
      
      // This month's revenue
      Booking.aggregate([
        { $match: { payment_status: 'paid', created_at: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: '$total_price' } } }
      ]),
      
      // Payment status breakdown
      Booking.aggregate([
        { $group: { _id: '$payment_status', count: { $sum: 1 } } }
      ]),
      
      // Average booking value
      Booking.aggregate([
        { $match: { payment_status: 'paid' } },
        { $group: { _id: null, avg: { $avg: '$total_price' } } }
      ])
    ]);

    const paymentStatusBreakdown = {};
    stats[3].forEach(item => {
      paymentStatusBreakdown[item._id] = item.count;
    });

    res.json({
      total_revenue: stats[0][0]?.total || 0,
      today_revenue: stats[1][0]?.total || 0,
      month_revenue: stats[2][0]?.total || 0,
      payment_status_breakdown: paymentStatusBreakdown,
      average_booking_value: stats[4][0]?.avg || 0
    });

  } catch (error) {
    console.error('Get payment stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;