import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { UserModule } from 'src/user/user.module';
import { RegionModule } from 'src/region/region.module';
import { CityModule } from 'src/city/city.module';

@Module({
  imports: [SequelizeModule.forFeature([Order]), UserModule, RegionModule, CityModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
