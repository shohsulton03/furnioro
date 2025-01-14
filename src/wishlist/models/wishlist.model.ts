import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

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
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;

  @ApiProperty({
    example: 12,
    description: 'User ID',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;
}
