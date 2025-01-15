import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

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
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ApiProperty({
    example: 12,
    description: 'Product ID',
  })
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
  raiting: number;

  @ApiProperty({
    example: 14,
    description: 'Review count',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  review_count: number;
}
