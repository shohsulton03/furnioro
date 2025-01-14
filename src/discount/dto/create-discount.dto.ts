import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDecimal, IsNotEmpty } from "class-validator";

export class CreateDiscountDto {
    @ApiProperty({
        example: 70,
        description: 'Discount percent',
    })
    @IsDecimal()
    @IsNotEmpty()
    persent: number;

    @ApiProperty({
        example: '01.01.2025',
        description: 'Discount create date',
    })
    @IsDate()
    @IsNotEmpty()
    createdDate: Date;

    @ApiProperty({
        example: '02.02.2025',
        description: 'Discount finish date',
    })
    @IsDate()
    @IsNotEmpty()
    finishDate: Date;
}
