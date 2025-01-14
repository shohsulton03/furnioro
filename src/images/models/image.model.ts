import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IImagesCreationAttr {
  image: string;
  productId: number;
}

@Table({ tableName: 'images' })
export class Image extends Model<Image, IImagesCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Material unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'image1.png',
    description: 'URL yoki fayl nomi rasm uchun',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @ApiProperty({
    example: 1,
    description: "Mahsulot ID (bog'langan)",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;
}
