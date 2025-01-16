import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment)
    private paymentModel: typeof Payment
  ){}
  create(createPaymentDto: CreatePaymentDto) {
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
      throw new Error(`Payment with ID ${id} not found`);
    }
  
    return { message: 'Payment deleted successfully ✅' };
  }
  
  
}
