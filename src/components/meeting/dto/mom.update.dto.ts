import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MomUpdateDto {
  @ApiProperty({ description: 'Meeting ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Minutes of Meeting' })
  @IsString()
  @IsNotEmpty()
  mom: string;
}
