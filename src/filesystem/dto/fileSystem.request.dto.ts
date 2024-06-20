import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FileSystemRequestDto {
  @IsString()
  @ApiProperty({
    description: 'Request Key String',
    example: 'bd6851d1-9124-4bc7-b0e3-65dbb6e337df-Winner_Winner_Funky_Chicken_Dinner.mp3',
  })
  readonly key: string;
}
