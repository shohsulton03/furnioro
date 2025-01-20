import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { PaymentTypeService } from 'src/payment_type/payment_type.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private paymentModel: typeof Payment,
    private paymentTypeService: PaymentTypeService,
    private orderService: OrderService
  ){}
  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const paymentType = await this.paymentTypeService.findOne(createPaymentDto.paymentTypeId);
    const order = await this.orderService.findOne(createPaymentDto.orderId);

    if (!paymentType ||!order) {
      throw new BadRequestException('Payment Type or Order not found');
    }

    return this.paymentModel.create(createPaymentDto);
  }

  findAll() {
    return this.paymentModel.findAll({ include: { all: true}});
  }

  findOne(id: number) {
    return this.paymentModel.findOne({ where: {id}});
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.paymentModel.update(updatePaymentDto, {
      where: { id },
      returning: true,
    });
  
    if (!payment || !payment[1] || payment[1].length === 0) {
      throw new BadRequestException(`Payment with ID ${id} not found or update failed`);
    }
    return payment[1][0];
  }
  

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.paymentModel.destroy({ where: { id } });
  
    if (result === 0) {
      throw new BadRequestException(`Payment with ID ${id} not found`);
    }
  
    return { message: 'Payment deleted successfully ✅' };
  }
  
}
