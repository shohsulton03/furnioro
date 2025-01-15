import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsDecimal, IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

export class CreateDiscountDto {
  @ApiProperty({
    example: 70,
    description: 'Discount percent',
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  percent: number;

  @ApiProperty({
    example: '01.01.2025',
    description: 'Discount create date',
  })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  createdDate?: Date;

  @ApiProperty({
    example: '02.02.2025',
    description: 'Discount finish date',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  finishDate: Date;
}
