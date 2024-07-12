import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class Owner {
  @ApiProperty({ description: 'Owner name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Owner role' })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ description: 'Owner image' })
  @IsString()
  @IsNotEmpty()
  image: string;
}

export class MeetingCreateDto {
  @ApiProperty({ description: 'Meeting title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: [Owner], description: 'List of owners' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Owner)
  owner: Owner[];
}
