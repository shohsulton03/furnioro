import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty({
    example: 'Metall',
    description: 'Name of the metherial whis is used in.',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
