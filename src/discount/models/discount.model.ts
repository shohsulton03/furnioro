import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "src/product/model/product.model";

interface IDiscountAttr {
    percent: number;
    createdDate: Date;
    finishDate: Date;
}

@Table({ tableName: "discount"})
export class Discount extends Model<Discount, IDiscountAttr> {
    @ApiProperty({
        example: 1,
        description: 'Discount id',
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: 10,
        description: 'Discount percent',
    })
    @Column({
        type: DataType.FLOAT,
        defaultValue: 0,
    })
    percent: number;

    @ApiProperty({
        example: new Date(),
        description: 'Discount created date',
    })
    @Column({
        type: DataType.DATE,
        defaultValue: new Date(),
    })
    createdDate: Date;

    @ApiProperty({
        example: new Date(),
        description: 'Discount finish date',
    })
    @Column({
        type: DataType.DATE,
        defaultValue: new Date(),
    })
    finishDate: Date;

    @HasMany(() => Product)
    products: Product[];
}
