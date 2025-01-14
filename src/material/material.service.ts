import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Material } from './models/material.model';

@Injectable()
export class MaterialService {
  constructor(@InjectModel(Material) private materialModel: typeof Material) {}

  create(createMaterialDto: CreateMaterialDto) {
    return this.materialModel.create(createMaterialDto);
  }

  findAll() {
    return this.materialModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.materialModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    const wishlist = await this.materialModel.update(
      { ...updateMaterialDto },
      { where: { id }, returning: true },
    );
    return wishlist[1][0];
  }

  remove(id: number) {
    return this.materialModel.destroy({ where: { id } });
  }
}
