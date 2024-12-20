import { Controller, Post, Body, Param } from '@nestjs/common';
import { PaymentService } from './playment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPaymentIntent(@Body('amount') amount: number) {
    return this.paymentService.createPaymentIntent(amount);
  }

  @Post('activate-premium/:userId')
  async activatePremium(@Param('userId') userId: number) {
    return this.paymentService.activatePremium(userId);
  }
}
