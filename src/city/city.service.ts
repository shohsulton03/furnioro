import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './models/city.model';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City)
    private readonly cityModel: typeof City,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    return await this.cityModel.create(createCityDto);
  }

  async findAll(): Promise<City[]> {
    return await this.cityModel.findAll({ include: {all:true}});
  }

  async findOne(id: number): Promise<City> {
    const city = await this.cityModel.findByPk(id);
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    const city = await this.findOne(id);
    await city.update(updateCityDto);
    return city;
  }

  async remove(id: number): Promise<void> {
    const city = await this.findOne(id);
    await city.destroy();
  }
}
