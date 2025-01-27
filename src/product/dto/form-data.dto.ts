import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Min } from 'sequelize-typescript';

export class FormDataDto {
  @ApiProperty({
    example: 'Divan',
    description: 'product name',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @ApiProperty({
    example: 'Yashash xonasi uchun qulay divan',
    description: 'Mahsulot haqida tavsif',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  desc: string;

  @ApiProperty({
    example: 'Divan, yostiq',
    description: 'Savdo paketi tarkibi',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  sales_package: string;

  @ApiProperty({
    example: 499.99,
    description: 'Mahsulot narxi',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  price: number;

  @ApiProperty({
    example: 150,
    description: 'Mahsulot kengligi (sm)',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  width: number;

  @ApiProperty({
    example: 100,
    description: 'Mahsulot balandligi (sm)',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  height: number;

  @ApiProperty({
    example: 75,
    description: "Mahsulot og'irligi (kg)",
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  weight: number;

  @ApiProperty({
    example: 50,
    description: 'Mahsulot chuqurligi (sm)',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  depth: number;

  @ApiProperty({
    example: 3,
    description: 'Mahsulotga tegishli kategoriyaning ID-si',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  categoryId: number;

  @ApiProperty({
    example: 10,
    description: 'Ombordagi mahsulot miqdori',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  quantity: number;

  @ApiProperty({
    example: "O'zbekiston",
    description: 'Mahsulot ishlab chiqarilgan mamlakat',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  created_country: string;

  @ApiProperty({
    example: 12,
    description: 'Kafolat muddati (oylar hisobida)',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  garanty: number;

  @ApiProperty({
    example: ['Qizil', "Ko'k", 'Yashil'],
    description: 'Mahsulot ranglari',
  })
  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  colors: string;

  @ApiProperty({
    example: 5,
    description: 'Mahsulotga tegishli chegirma ID-si',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  discountId: number;

  @ApiProperty({
    example: 'Paxta',
    description: 'Mahsulotning asosiy materiali uchun ID',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  filling_material: string;

  @ApiProperty({
    example: 'Charm',
    description: 'Mahsulotning qoplama materiali',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  upholstery_material: string;

  @ApiProperty({
    example: 'Plastmassa',
    description: 'Mahsulotning ikkilamchi materiali (agar mavjud bo‘lsa)',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  secondary_material?: string;

  @ApiProperty({
    type: 'array',
    description: 'Array of image files (images)',
    items: {
      type: 'string',
      example: 'example.jpg',
      format: 'binary',
    },
  })
  @IsArray()
  @IsOptional()
  images: string[];
}
