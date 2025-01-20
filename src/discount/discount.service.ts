import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './models/discount.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount) private readonly discountModel: typeof Discount,
  ) {}
  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    return this.discountModel.create(createDiscountDto);
  }

  findAll() {
    return this.discountModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.discountModel.findOne({
      where: { id },
      include: { all: true },
    });
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    const discount = this.discountModel.update(updateDiscountDto, {
      where: { id },
      returning: true,
    });

    return discount[1][0];
  }

  remove(id: number) {
    return this.discountModel.destroy({ where: { id } });
  }
}
