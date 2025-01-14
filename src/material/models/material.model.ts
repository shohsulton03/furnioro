import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface IMaterialAttr {
  title: string;
}

@Table({ tableName: 'material' })
export class Material extends Model<Material, IMaterialAttr> {
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
    example: 'aluminiy',
    description: 'material nomi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
}
