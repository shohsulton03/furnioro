import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus } from "../models/order.model";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({
    example: 1,
    description: 'User ID for the order',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: '1',
    description: 'ID of the address',
  })
  @IsNumber()
  order_addressId: number;

  //   @ApiProperty({
  //     example: new Date(),
  //     description: 'Date of the order',
  //   })
  //   @IsDate()
  //   order_date: Date;

  @ApiProperty({
    example: 10,
    description: 'Total amount for the order',
  })
  @IsNumber()
  total_amount: number;

  @ApiProperty({
    example: 'Pending',
    description: 'Status of the order',
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
