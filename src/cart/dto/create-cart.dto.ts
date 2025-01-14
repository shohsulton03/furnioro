import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCartDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 23,
        description: "ID of user"
    })
    user_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "2025-01-14T10:30:00.000Z",
        description: "Date and time when the record was created (ISO format)",
    })
    createdAt: Date;
}