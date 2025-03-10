import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Cart } from "src/cart/models/cart.model";
import { Order } from "src/order/models/order.model";
import { Rating } from "../../rating/models/rating.model";
import { Wishlist } from "src/wishlist/models/wishlist.model";
import { OrderAddress } from "../../order_address/models/order_address.model";

interface IUserCreationAttr {
  full_name: string;
  email: string;
  hashed_password: string;
  phone_number: string;
  is_active: boolean;
  is_owner: boolean;
}

@Table({ tableName: 'user' })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'User unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Sobir Karimov',
    description: 'User full_name',
  })
  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User unique email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'hashpassword',
    description: 'User password',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: '+998905689789',
    description: 'User phone number',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  phone_number: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @HasMany(() => Rating)
  ratings: Rating[]; 


  @HasMany(() => Wishlist)
  wishlist: Wishlist[];

  @HasMany(() => Cart)
  cart: Cart[];

  @HasMany(() => Rating)
  rating: Rating[];

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => OrderAddress)
  order_addresses: OrderAddress[];
}
