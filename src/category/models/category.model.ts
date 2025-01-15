import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "../../product/model/product.model";

interface ICategoryAttr{
    name:string
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, ICategoryAttr> {
  @ApiProperty({
    example: 1,
    description: 'Categoty unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'divan',
    description: 'mebel turi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'category haqida malumot',
    description: 'category haqida malumot',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  desc?: string;

  @HasMany(() => Product)
  products : Product[]
}
