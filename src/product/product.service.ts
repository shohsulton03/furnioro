import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { DiscountService } from 'src/discount/discount.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    private categoryService: CategoryService,
    private discountService: DiscountService
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.findOne(createProductDto.categoryId);
    const discount = await this.discountService.findOne(createProductDto.discountId);

    if(!category || !discount){
      throw new BadRequestException('Invalid category or discount');
    }
    return this.productModel.create(createProductDto);
  }

  async findAll() {
    return this.productModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.productModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productModel.update(
      { ...updateProductDto },
      { where: { id }, returning: true },
    );
    return updatedProduct[1][0];
  }

  async remove(id: number) {
    return this.productModel.destroy({ where: { id } });
  }
}
