import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

interface IRegionAttr{
    name:string
}


@Table({ tableName: 'payment_type' })
export class Region extends Model<Region, IRegionAttr> {
  @ApiProperty({
    example: 1,
    description: 'Region unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Toshkent',
    description: "Toshkent shahri",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  
}
