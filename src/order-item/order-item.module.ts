import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { OrderItem } from './models/order-item.model';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';
// import { Order } from '../order/order.model';
// import { Product } from '../product/product.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderItem]), OrderModule, ProductModule],
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService]
})
export class OrderItemModule {}
