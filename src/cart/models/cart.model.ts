import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { CartItem } from "src/cart_items/models/cart_item.model";
import { User } from "src/user/models/user.model";


interface ICartAttr {
    user_id: number;
    createdAt: Date;
}

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart, ICartAttr> {
    @ApiProperty({
        example: 1,
        description: 'Cart id',
    })
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: 1,
        description: "ID of user"
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
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

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => CartItem)
    cartItems: CartItem[];
}

