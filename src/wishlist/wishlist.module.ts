import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wishlist } from './models/wishlist.model';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Wishlist]), ProductModule, UserModule],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: [WishlistService],
})
export class WishlistModule {}
