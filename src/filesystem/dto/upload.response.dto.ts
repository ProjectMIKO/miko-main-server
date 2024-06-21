import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @IsBoolean()
  @ApiProperty({
    description: 'Result of Upload Request',
    example: 'true',
  })
  result: boolean;

  @IsString()
  @ApiProperty({
    description: 'Uploaded File Key',
    example: 'bd6851d1-9124-4bc7-b0e3-65dbb6e337df-Winner_Winner_Funky_Chicken_Dinner.mp3',
  })
  key: string;
}
