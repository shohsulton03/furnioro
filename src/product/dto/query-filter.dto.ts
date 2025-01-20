import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryFilterDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsString()
  created_country?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  weight?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  width?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  height?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  depth?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  garanty?: number;

  @IsOptional()
  @IsString()
  filling_material?: string;

  @IsOptional()
  @IsString()
  upholstery_material?: string;

  @IsOptional()
  @IsString()
  secondary_material?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price_min?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price_max?: number;
}
