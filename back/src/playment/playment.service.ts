import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe('YOUR_SECRET_KEY', {
      apiVersion: '2022-11-15' as Stripe.LatestApiVersion,
    });
  }

  async createPaymentIntent(amount: number) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    return { clientSecret: paymentIntent.client_secret };
  }

  async activatePremium(userId: number) {
    // Логіка для активації преміум-акаунту
  }
}
