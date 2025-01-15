import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCartDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 23,
        description: "ID of user"
    })
    @IsNumber()
    user_id: number;
}