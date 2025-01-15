import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Divan',
    description: 'product name',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Yashash xonasi uchun qulay divan',
    description: 'Mahsulot haqida tavsif',
  })
  @IsString()
  @IsNotEmpty()
  desc: string;

  @ApiProperty({
    example: 'Divan, yostiq',
    description: 'Savdo paketi tarkibi',
  })
  @IsString()
  @IsNotEmpty()
  sales_package: string;

  @ApiProperty({
    example: 499.99,
    description: 'Mahsulot narxi',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 150,
    description: 'Mahsulot kengligi (sm)',
  })
  @IsNumber()
  width: number;

  @ApiProperty({
    example: 100,
    description: 'Mahsulot balandligi (sm)',
  })
  @IsNumber()
  height: number;

  @ApiProperty({
    example: 75,
    description: "Mahsulot og'irligi (kg)",
  })
  @IsNumber()
  weight: number;

  @ApiProperty({
    example: 50,
    description: 'Mahsulot chuqurligi (sm)',
  })
  @IsNumber()
  depth: number;

  @ApiProperty({
    example: 3,
    description: 'Mahsulotga tegishli kategoriyaning ID-si',
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    example: 10,
    description: 'Ombordagi mahsulot miqdori',
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: "O'zbekiston",
    description: 'Mahsulot ishlab chiqarilgan mamlakat',
  })
  @IsString()
  @IsNotEmpty()
  created_country: string;

  @ApiProperty({
    example: 12,
    description: 'Kafolat muddati (oylar hisobida)',
  })
  @IsNumber()
  garanty: number;

  @ApiProperty({
    example: ['Qizil', "Ko'k", 'Yashil'],
    description: 'Mahsulot ranglari',
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  colors: string[];

  @ApiProperty({
    example: 5,
    description: 'Mahsulotga tegishli chegirma ID-si',
  })
  @IsNumber()
  @IsOptional()
  discountId: number;

  @ApiProperty({
    example: 'Paxta',
    description: 'Mahsulotning asosiy materiali uchun ID',
  })
  @IsString()
  @IsNotEmpty()
  filling_material: string;

  @ApiProperty({
    example: 'Charm',
    description: 'Mahsulotning qoplama materiali',
  })
  @IsString()
  @IsNotEmpty()
  upholstery_material: string;

  @ApiProperty({
    example: 'Plastmassa',
    description: 'Mahsulotning ikkilamchi materiali (agar mavjud bo‘lsa)',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  secondary_material?: string;
}
