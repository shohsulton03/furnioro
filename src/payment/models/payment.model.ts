import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

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
        primaryKey: true 
    })
    id: string;

    @ApiProperty({
        example: 1,
        description: 'Order id',
    })
    @Column({
        type: DataType.INTEGER,
    })
    orderId: number;

    @ApiProperty({
        example: 1,
        description: 'Payment type id',
    })
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

}