import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './models/order-item.model';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectModel(OrderItem)
    private readonly orderItemModel: typeof OrderItem,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    return this.orderItemModel.create(createOrderItemDto);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<OrderItem> {
    const orderItem = await this.orderItemModel.findByPk(id);
    if (!orderItem) {
      throw new NotFoundException('Order item not found');
    }
    return orderItem;
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItem> {
    const orderItem = await this.findOne(id);
    return orderItem.update(updateOrderItemDto);
  }

  async remove(id: number): Promise<void> {
    const orderItem = await this.findOne(id);
    await orderItem.destroy();
  }
}
