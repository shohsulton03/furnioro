import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
// import { Order } from '../order/order.model';
// import { Product } from '../product/product.model'; 

interface IOrderItemCreationAttr{
    order_is:number
    product_id:number
    quantity: number;
    price: number;

}

@Table({ tableName: 'order_item' })
export class OrderItem extends Model<OrderItem, IOrderItemCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

//   @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER, allowNull: false })
  order_id: number;

//   @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price: number;
}
