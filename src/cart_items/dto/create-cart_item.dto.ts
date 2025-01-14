import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCartItemDto {
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 23,
        description: "ID of cart"
    })
    cart_id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 23,
        description: "ID of product",
    })
    product_id: number;


    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 23,
        description: "product quantity",
    })
    quantity: number
}