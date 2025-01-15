import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Region } from "src/region/models/region.model";


interface ICityAttr {
    region_id: number;
    name: string;
}

@Table({ tableName: 'city' })
export class City extends Model<City, ICityAttr> {
    @ApiProperty({
        example: 1,
        description: 'City id',
    })
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;
    

    @ApiProperty({
        example: 1,
        description: 'City unique ID(autoIncrement)',
    })
    @ForeignKey(() => Region)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    region_id: number

    @ApiProperty({
        example: 'Tashkent',
        description: 'City name',
    })
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @BelongsTo(() => Region)
    region: Region;
}