import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './models/cart.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
   imports: [SequelizeModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
