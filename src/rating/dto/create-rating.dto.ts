import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRatingDto {
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

  @ApiProperty({
    example: 1,
    description: 'Product rating',
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    example: 1,
    description: 'Review count',
  })
  @IsNumber()
  @IsNotEmpty()
  review_count: number;
}
