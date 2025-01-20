import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/order/models/order.model';
import { Product } from 'src/product/model/product.model';
// import { Order } from '../order/order.model';
// import { Product } from '../product/product.model'; 

interface IOrderItemCreationAttr{
    order_id:number
    product_id:number
    quantity: number;
    price: number;

}

@Table({ tableName: 'order_item' })
export class OrderItem extends Model<OrderItem, IOrderItemCreationAttr> {
  @ApiProperty({
      example: 1,
      description: "Order Item id"
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "Order id"
  })
  @ForeignKey(() => Order)
  @Column({ 
    type: DataType.INTEGER, 
    allowNull: false 
  })
  order_id: number;

  @ApiProperty({
    example: 1,
    description: "Product FK id"
  })
  @ForeignKey(() => Product)
  @Column({ 
    type: DataType.INTEGER, 
    allowNull: false 
  })
  product_id: number;

  @ApiProperty({
    example: 1000000,
    description: "Order Item quantity"
  })
  @Column({ 
    type: DataType.INTEGER, 
    allowNull: false 
  })
  quantity: number;

  @ApiProperty({
    example: 11111,
    description: "Order Item price"
  })
  @Column({ 
    type: DataType.DECIMAL(10, 2), 
    allowNull: false 
  })
  price: number;


  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Order)
  order: Order;
}
