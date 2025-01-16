import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { PaymentType } from "../../payment_type/models/payment_type.model";
import { Order } from "src/order/models/order.model";

export enum Payment_Status {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
    CANCELLED = 'cancelled',
}

interface IPaymentAttr {
    orderId: number;
    paymentTypeId: number;
    amount: number;
    status: Payment_Status;
}

@Table({ tableName: "Payment"})
export class Payment extends Model<Payment, IPaymentAttr>{
    @ApiProperty({
        example: 1,
        description: 'Payment id',
    })
    @Column({ 
        type: DataType.INTEGER, 
        primaryKey: true ,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({
        example: 1,
        description: 'Order id',
    })
    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
    })
    orderId: number;

    @ApiProperty({
        example: 1,
        description: 'Payment type id',
    })
    @ForeignKey(() => PaymentType)
    @Column({
        type: DataType.INTEGER,
    })
    paymentTypeId: number;

    @ApiProperty({
        example: 1000,
        description: 'Payment amount',
    })
    @Column({
        type: DataType.DECIMAL,
        defaultValue: 0,
    })
    amount: number;

    @ApiProperty({
        example: Payment_Status.PENDING,
        description: 'Payment status',
    })
    @Column({
        type: DataType.ENUM,
        defaultValue: Payment_Status.PENDING,
        values: Object.values(Payment_Status)
    })
    status: Payment_Status;

    @BelongsTo(() => PaymentType)
    paymentType: PaymentType;

    @BelongsTo(() => Order)
    order: Order;
}
