import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/product/model/product.model';
import { User } from 'src/user/models/user.model';

interface IWishlistAttr {
  product_id: number;
  user_id: number;
}

@Table({ tableName: 'wishlist' })
export class Wishlist extends Model<Wishlist, IWishlistAttr> {
  @ApiProperty({
    example: 1,
    description: 'Wishlist unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 23,
    description: 'Product ID',
  })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;

  @ApiProperty({
    example: 12,
    description: 'User ID',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;


  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => User)
  user: User;

}
