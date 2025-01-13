import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { City } from './models/city.model';

@Module({
  imports: [SequelizeModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
