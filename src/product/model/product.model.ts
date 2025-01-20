import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model, HasMany } from 'sequelize-typescript';
import { Rating } from 'src/rating/models/rating.model';
import { Column, DataType, Table, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { CartItem } from 'src/cart_items/models/cart_item.model';
import { OrderItem } from 'src/order-item/models/order-item.model';
import { Rating } from '../../rating/models/rating.model';
import { Discount } from '../../discount/models/discount.model';
import { Category } from '../../category/models/category.model';
import { Wishlist } from '../../wishlist/models/wishlist.model';

interface IProductCreationAttr {
  title: string;
  desc: string;
  sales_package: string;
  price: number;
  width: number;
  height: number;
  weight: number;
  depth: number;
  categoryId: number;
  quantity: number;
  created_country: string;
  garanty: number;
  colors: string[];
  discountId: number;
  filling_material: string;
  upholstery_material:string;
  secondary_material:string
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, IProductCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Admin unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Divan',
    description: 'product name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Yashash xonasi uchun qulay divan',
    description: 'Mahsulot haqida tavsif',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  desc: string;

  @ApiProperty({
    example: 'Divan, yostiq',
    description: 'Savdo paketi tarkibi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sales_package: string;

  @ApiProperty({
    example: 499.99,
    description: 'Mahsulot narxi',
  })
  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  price: number;

  @ApiProperty({
    example: 150,
    description: 'Mahsulot kengligi (sm)',
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  width: number;

  @ApiProperty({
    example: 100,
    description: 'Mahsulot balandligi (sm)',
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  height: number;

  @ApiProperty({
    example: 75,
    description: "Mahsulot og'irligi (kg)",
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  weight: number;

  @ApiProperty({
    example: 50,
    description: 'Mahsulot chuqurligi (sm)',
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  depth: number;

  @ApiProperty({
    example: 3,
    description: 'Mahsulotga tegishli kategoriyaning ID-si',
  })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;
  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({
    example: 10,
    description: 'Ombordagi mahsulot miqdori',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  quantity: number;

  @ApiProperty({
    example: "O'zbekiston",
    description: 'Mahsulot ishlab chiqarilgan mamlakat',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  created_country: string;

  @ApiProperty({
    example: 12,
    description: 'Kafolat muddati (oylar hisobida)',
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  garanty: number;

  @ApiProperty({
    example: ['Qizil', "Ko'k", 'Yashil'],
    description: 'Mahsulot ranglari',
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  colors: string[];

  @ApiProperty({
    example: 5,
    description: 'Mahsulotga tegishli chegirma ID-si',
  })
  @ForeignKey(() => Discount)
  @Column({
    type: DataType.INTEGER,
  })
  discountId?: number;
  @BelongsTo(() => Discount)
  discount: Discount;

  @ApiProperty({
    example: 'Paxta',
    description: 'Mahsulotning asosiy materiali uchun ID',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  filling_material: string;

  @ApiProperty({
    example: 'Charm',
    description: 'Mahsulotning qoplama materiali',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  materialsId: number;

    @HasMany(() => Rating)
    ratings: Rating[]; 

  upholstery_material: string;

  @ApiProperty({
    example: 'Plastmassa',
    description: 'Mahsulotning ikkilamchi materiali (agar mavjud bo‘lsa)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  secondary_material?: string;

  @HasMany(() => Wishlist)
  wishlist: Wishlist[];

  @HasMany(() => OrderItem)
  orderItem: OrderItem[];

  @HasMany(() => CartItem)
  cartItem: CartItem[];

  @HasMany(() => Rating)
  rating: Rating[];

}
