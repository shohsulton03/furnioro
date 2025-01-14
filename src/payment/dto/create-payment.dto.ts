import { Payment_Status } from "../models/payment.model";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";


export class CreatePaymentDto {
    @ApiProperty({
        example: 1,
        description: 'Payment order_id',
    })
    @IsNumber()
    @IsNotEmpty()
    orderId: number;

    @ApiProperty({
        example: 1,
        description: 'Payment payment_type_id',
    })
    @IsNumber()
    @IsNotEmpty()
    paymentTypeId: number;

    @ApiProperty({
        example: 1000000,
        description: 'Payment amount',
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({
        example: 'pending',
        description: 'Payment status',
    })
    @IsNotEmpty()
    @IsEnum(Payment_Status)
    status: Payment_Status;
}
