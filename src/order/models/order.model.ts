import { ApiProperty } from '@nestjs/swagger';
import { DATE } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { OrderItem } from 'src/order-item/models/order-item.model';
import { Payment } from 'src/payment/models/payment.model';
import { User } from 'src/user/models/user.model';
import { OrderAddress } from '../../order_address/models/order_address.model';

export enum OrderStatus {
  Pending = 'Pending',
  Processed = 'Processed',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

interface IOrderCreateinAttr {
  userId: number;
  order_addressId: number;
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
    example: 1,
    description: 'Order Address ID',
  })
  @ForeignKey(() => OrderAddress)
  @Column({
    type: DataType.INTEGER,
  })
  order_addressId: number;

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

  @HasMany(() => OrderItem, { onDelete: 'CASCADE' })
  orderItems: OrderItem[];

  @HasMany(() => Payment)
  payments: Payment[];

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => OrderAddress)
  order_address: OrderAddress;
}