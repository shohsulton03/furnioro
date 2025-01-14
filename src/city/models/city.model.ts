import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model } from 'sequelize-typescript';


interface ICityAttr {
    region_id: number;
    name: string;
}

@Table({ tableName: 'city' })
export class City extends Model<City, ICityAttr> {
    @ApiProperty({
        example: 1,
        description: 'City unique ID(autoIncrement)',
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
}