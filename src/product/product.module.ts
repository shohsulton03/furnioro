import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { CategoryModule } from 'src/category/category.module';
import { DiscountModule } from 'src/discount/discount.module';

@Module({
  imports: [SequelizeModule.forFeature([Product]), CategoryModule, DiscountModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
