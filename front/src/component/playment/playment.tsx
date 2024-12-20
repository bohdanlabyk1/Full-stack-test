import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './playmentform';
import { createPaymentIntent } from './../api/api';  // Import the createPaymentIntent API function

const stripePromise = loadStripe('Ваш_PUBLISHABLE_KEY');

interface PaymentPageProps {
  onPaymentSuccess: () => void;  // Callback when payment is successful
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onPaymentSuccess }) => {
  const handleCreatePaymentIntent = async () => {
    try {
      const paymentData = await createPaymentIntent(1000);  // Create payment intent with amount
      return paymentData.clientSecret;
    } catch (error) {
      console.error('Error creating payment intent', error);
      return null;
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onPaymentSuccess={onPaymentSuccess} createPaymentIntent={handleCreatePaymentIntent} />
    </Elements>
  );
};

export default PaymentPage;
