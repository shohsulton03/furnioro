import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './models/cart.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/user/user.module';

@Module({
   imports: [SequelizeModule.forFeature([Cart]), UserModule],
  controllers: [CartController],
  providers: [CartService],
  exports:[CartService]
})
export class CartModule {}
