import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/product/model/product.model';
import { User } from 'src/user/models/user.model';

interface IRatingAttr {
  product_id: number;
  user_id: number;
}

@Table({ tableName: 'rating' })
export class Rating extends Model<Rating, IRatingAttr> {
  @ApiProperty({
    example: 1,
    description: 'Rating unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 23,
    description: 'User ID',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ForeignKey(()=>Product)
  @ApiProperty({
    example: 12,
    description: 'Product ID',
  })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;

  @ApiProperty({
    example: 4.5,
    description: 'Rating',
  })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  rating: number;

  @ApiProperty({
    example: 14,
    description: 'Review count',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  review_count: number;

  @BelongsTo(() => User)
  user: User;
  
  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Product)
  product: Product;

}
