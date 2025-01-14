import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ example: 1, description: 'ID of the order' })
  @IsNumber()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty({ example: 1, description: 'ID of the product' })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ example: 2, description: 'Quantity of the product' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 19.99, description: 'Price of the product' })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
