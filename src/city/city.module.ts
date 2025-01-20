import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { City } from './models/city.model';
import { RegionModule } from 'src/region/region.module';

@Module({
  imports: [SequelizeModule.forFeature([City]), RegionModule],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService]
})
export class CityModule {}
