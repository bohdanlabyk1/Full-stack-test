import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

interface CheckoutFormProps {
  onPaymentSuccess: () => void;  // Callback prop
  createPaymentIntent: () => Promise<string | null>;  // Create payment intent function
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onPaymentSuccess, createPaymentIntent }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    const clientSecret = await createPaymentIntent();  // Get client secret from API

    if (!clientSecret) {
      setIsProcessing(false);
      console.error('Failed to create payment intent');
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      if (result.paymentIntent?.status === 'succeeded') {
        console.log('Оплата успішна!');
        onPaymentSuccess();  // Trigger the success callback after payment
      }
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={isProcessing || !stripe}>
        {isProcessing ? 'Оплата...' : 'Оплатити'}
      </button>
    </form>
  );
};

export default CheckoutForm;
