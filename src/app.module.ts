import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import { UserModule } from './user/user.module';
import { User } from './user/models/user.model';
import { AuthModule } from './auth/auth.module';
import { Otp } from './auth/models/otp.model';
import { MailModule } from './mail/mail.module';
import { DiscountModule } from './discount/discount.module';
import { CityModule } from './city/city.module';
import { PaymentTypeModule } from './payment_type/payment_type.module';
import { PaymentType } from './payment_type/models/payment_type.model';
import { CategoryModule } from './category/category.module';
import { Category } from './category/models/category.model';
import { ProductModule } from './product/product.module';
import { Product } from './product/model/product.model';
import { OrderModule } from './order/order.module';
import { Order } from './order/models/order.model';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Admin, User, Otp, PaymentType, Category, Product, Order],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    AdminModule,
    UserModule,
    AuthModule,
    MailModule,
    DiscountModule,
    CityModule,
    PaymentTypeModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    PaymentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
