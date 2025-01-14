import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model } from 'sequelize-typescript';


interface ICartAttr {
    user_id: number;
    createdAt: Date;
}

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart, ICartAttr> {
    @ApiProperty({
        example: 23,
        description: "ID of user"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    user_id: number

    @ApiProperty({
        example: "2025-01-14T10:30:00.000Z",
        description: "Date and time when the record was created (ISO format)",
    })
    @Column({
        type: DataType.DATE,
    })
    createdAt: Date;
}