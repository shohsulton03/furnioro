import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateImageDto {
  //   @ApiProperty({
  //     example: 'image1.png',
  //     description: 'URL yoki fayl nomi rasm uchun',
  //   })
  //   @IsString()
  //   @IsNotEmpty()
  //   image: string;

  @ApiProperty({
    example: 1,
    description: "Mahsulot ID (bog'langan)",
  })
  @IsNumber()
  @Type(() => Number)
  productId: number;
}
