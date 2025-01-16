import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './models/city.model';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { RegionService } from 'src/region/region.service';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City) private readonly cityModel: typeof City,
    private readonly regionService: RegionService
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const region = await this.regionService.findOne(createCityDto.region_id);
    if (!region) {
      throw new BadRequestException(`Region with ID ${createCityDto.region_id} not found`);
    }
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
