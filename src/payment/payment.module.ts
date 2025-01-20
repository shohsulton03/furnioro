import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { OrderModule } from 'src/order/order.module';
import { PaymentTypeModule } from 'src/payment_type/payment_type.module';

@Module({
  imports: [SequelizeModule.forFeature([Payment]), OrderModule, PaymentTypeModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
