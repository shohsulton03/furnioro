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
import { OrderItemModule } from './order-item/order-item.module';
import { OrderItem } from './order-item/models/order-item.model';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { Product } from './product/model/product.model';
import { Order } from './order/models/order.model';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/models/cart.model';
import { Payment } from './payment/models/payment.model';
import { Discount } from './discount/models/discount.model';
import { City } from './city/models/city.model';
import { Wishlist } from './wishlist/models/wishlist.model';
import { ImagesModule } from './images/images.module';
import { Image } from './images/models/image.model';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { CartItem } from './cart_items/models/cart_item.model';
import { CartItemsModule } from './cart_items/cart_items.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { Material } from './material/models/material.model';
import { MaterialModule } from './material/material.module';
import { RatingModule } from './rating/rating.module';
import { Rating } from './rating/models/rating.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        User,
        Otp,
        PaymentType,
        Category,
        Product,
        Order,
        OrderItem,
        Cart,
        Payment,
        Discount,
        City,
        Wishlist,
        Image,
        CartItem,
        Material,
        Rating
      ],
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
    PaymentModule,
    OrderItemModule,
    CartModule,
    ImagesModule,
    FileModule,
    CartItemsModule,
    WishlistModule,
    MaterialModule,
    RatingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
