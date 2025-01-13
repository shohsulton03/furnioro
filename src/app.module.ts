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
import { CityModule } from './city/city.module';

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
      models: [Admin, User, Otp],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    AdminModule,
    UserModule,
    AuthModule,
    MailModule,
    CityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
