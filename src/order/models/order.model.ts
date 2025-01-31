import { ApiProperty } from '@nestjs/swagger';
import { DATE } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { City } from 'src/city/models/city.model';
import { OrderItem } from 'src/order-item/models/order-item.model';
import { Payment } from 'src/payment/models/payment.model';
import { Region } from 'src/region/models/region.model';
import { User } from 'src/user/models/user.model';

export enum OrderStatus {
  Pending = 'Pending',
  Processed = 'Processed',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

interface IOrderCreateinAttr {
  userId: number;
  address: string;
  regionId: number;
  cityId: number;
  zip_code: string;
  phone_number: string;
  email: string;
  order_date: Date;
  total_amount: number;
  status: OrderStatus;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, IOrderCreateinAttr> {
  @ApiProperty({
    example: 1,
    description: 'Product unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'User ID for the order',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({
    example: '123 Main St',
    description: 'Address for delivery',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ApiProperty({
    example: 1,
    description: 'Region ID',
  })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  regionId: number;

  @ApiProperty({
    example: 1,
    description: 'City ID',
  })
  @ForeignKey(() => City)
  @Column({
    type: DataType.INTEGER,
  })
  cityId: number;

  @ApiProperty({
    example: '10001',
    description: 'ZIP code for the delivery address',
  })
  @Column({
    type: DataType.STRING,
  })
  zip_code: string;

  @ApiProperty({
    example: '123-456-7890',
    description: 'Phone number for contact',
  })
  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address for contact',
  })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({
    example: new Date(),
    description: 'Date of the order',
  })
  @Column({
    type: DataType.DATE,
  })
  order_date: Date;

  @ApiProperty({
    example: 10,
    description: 'Total amount for the order',
  })
  @Column({
    type: DataType.DECIMAL(15, 2),
  })
  total_amount: number;

  @ApiProperty({
    example: 'Pending',
    description: 'Status of the order',
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(OrderStatus),
  })
  status: OrderStatus;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @HasMany(() => Payment)
  payments: Payment[];

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Region)
  region: Region;

  @BelongsTo(() => City)
  city: City;
}