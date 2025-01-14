import { Module } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CartItemsController } from './cart_items.controller';
import { CartItem } from './models/cart_item.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([CartItem])],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
