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
    example: '123 Main St',
    description: 'Address for delivery',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 1,
    description: 'Region ID',
  })
  @IsNumber()
  regionId: number;

  @ApiProperty({
    example: 1,
    description: 'City ID',
  })
  @IsNumber()
  cityId: number;

  @ApiProperty({
    example: '10001',
    description: 'ZIP code for the delivery address',
  })
  @IsString()
  @IsNotEmpty()
  zip_code: string;

  @ApiProperty({
    example: '123-456-7890',
    description: 'Phone number for contact',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(\+?[1-9]\d{1,2})?[\s\.-]?\(?\d{1,4}\)?[\s\.-]?\d{1,4}[\s\.-]?\d{1,4}[\s\.-]?\d{1,4}$/,
    {
      message:
        'Phone number must be a valid international format, e.g., +1 800-555-5555 or +44 20 7946 0958',
    },
  )
  phone_number: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address for contact',
  })
  @IsEmail()
  email: string;

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
