import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICartItemAttr {
  cart_id: number;
  product_id: number;
  quantity: number;
}

@Table({ tableName: 'cart_items' })
export class CartItem extends Model<CartItem, ICartItemAttr> {
  @ApiProperty({
    example: 1,
    description: 'CartItem uchun unique ID (autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 23,
    description: 'Cart ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cart_id: number;

  @ApiProperty({
    example: 45,
    description: 'Mahsulotning ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;

  @ApiProperty({
    example: 3,
    description: 'Mahsulot soni (quantity)',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;
}
