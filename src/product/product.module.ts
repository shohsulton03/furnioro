import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { CategoryModule } from 'src/category/category.module';
import { DiscountModule } from 'src/discount/discount.module';
import { FileModule } from '../file/file.module';
import { JwtModule } from '@nestjs/jwt';
import { Wishlist } from '../wishlist/models/wishlist.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, Wishlist]),
    CategoryModule,
    DiscountModule,
    FileModule,
    JwtModule.register({}),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
