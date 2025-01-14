import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty({
    example: 1,
    description: 'ID of product',
  })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;


  @ApiProperty({
    example: 1,
    description: 'ID of user',
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
