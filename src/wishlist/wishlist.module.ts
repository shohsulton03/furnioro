import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wishlist } from './models/wishlist.model';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { User } from '../user/models/user.model';
import { Product } from '../product/model/product.model';

@Module({
  imports: [SequelizeModule.forFeature([Wishlist, User, Product]), ProductModule, UserModule],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: [WishlistService],
})
export class WishlistModule {}
