import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './models/region.model';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region)
    private readonly regionModel: typeof Region,
  ) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    return await this.regionModel.create(createRegionDto);
  }

  async findAll(): Promise<Region[]> {
    return await this.regionModel.findAll();
  }

  async findOne(id: number): Promise<Region> {
    const region = await this.regionModel.findByPk(id);
    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto): Promise<Region> {
    const region = await this.findOne(id);
    await region.update(updateRegionDto);
    return region;
  }

  async remove(id: number): Promise<void> {
    const region = await this.findOne(id);
    await region.destroy();
  }
}
