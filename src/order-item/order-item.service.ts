import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './models/order-item.model';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectModel(OrderItem) private readonly orderItemModel: typeof OrderItem,
    private readonly productService: ProductService,
    private readonly orderService: OrderService
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const product = await this.productService.findOne(createOrderItemDto.product_id);
    const order = await this.orderService.findOne(createOrderItemDto.order_id);

    if( !product || !order){
      throw new BadRequestException('Product or Order not found');
    }
    
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
