import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../../user/models/user.model";
import { Order } from "../../order/models/order.model";


interface IOrderAddressCreationAttr {
  userId: number;
  region: string;
  city: string;
  zip_code: number;
  street: string;
  house_number: number;
  phone: string;
}

@Table({ tableName: 'order_address' })
export class OrderAddress extends Model<
  OrderAddress,
  IOrderAddressCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: 'Order address ID',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Customer ID',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ApiProperty({
    example: '123 Main St',
    description: 'region',
  })
  @Column({
    type: DataType.TEXT,
  })
  region: string;

  @ApiProperty({
    example: 'New York',
    description: 'City',
  })
  @Column({
    type: DataType.STRING,
  })
  city: string;

  @ApiProperty({
    example: 10000,
    description: 'Postal Code',
  })
  @Column({
    type: DataType.INTEGER,
  })
  zip_code: number;

  @ApiProperty({
    example: '12345',
    description: 'Street',
  })
  @Column({
    type: DataType.STRING,
  })
  street: string;

  @ApiProperty({
    example: 456,
    description: 'House Number',
  })
  @Column({
    type: DataType.INTEGER,
  })
  house_number: number;

  @ApiProperty({
    example: '+1 123-456-7890',
    description: 'Phone Number',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @BelongsTo(() => User)
  customer: User;

  @HasMany(() => Order)
  orders: Order[];
}
