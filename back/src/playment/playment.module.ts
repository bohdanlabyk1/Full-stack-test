import { Module } from '@nestjs/common';
import { PaymentService } from './playment.service';
import { PaymentController} from './playment.controller';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PlaymentModule {}
