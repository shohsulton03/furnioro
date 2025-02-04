import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    private readonly userService: UserService,
  
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const user = await this.userService.findOne(createOrderDto.userId);
    const order_date = new Date()

    if (!user) {
      throw new BadRequestException('Invalid user');
    }
    return this.orderModel.create({...createOrderDto, order_date});
  }

  async findAll() {
    return this.orderModel.findAll({ include: {all: true}});
  }

  async findOne(id: number) {
    return this.orderModel.findByPk(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const updatedOrder = await this.orderModel.update(
      { ...updateOrderDto },
      { where: { id }, returning: true },
    );
    return updatedOrder[1][0];
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.orderModel.destroy({ where: { id } });
  
    if (result === 0) {
      throw new Error(`Payment with ID ${id} not found`);
    }
  
    return { message: 'Payment deleted successfully ✅' };
  }
}
