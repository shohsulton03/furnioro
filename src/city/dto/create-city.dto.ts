import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCityDto {
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: "New York City",
        description: "Region ID"
    })
    region_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "New York",
        description: "City name"
    })
    name: string;
}
