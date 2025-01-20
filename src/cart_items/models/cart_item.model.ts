import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Cart } from "src/cart/models/cart.model";
import { Product } from "src/product/model/product.model";

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
  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cart_id: number;

  @ApiProperty({
    example: 45,
    description: 'Mahsulotning ID raqami',
  })
  @ForeignKey(() => Product)
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


  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Cart)
  cart: Cart;
}
