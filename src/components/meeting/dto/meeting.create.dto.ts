import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MeetingCreateDto {
  @ApiProperty({ description: 'Meeting title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Host ID' })
  @IsString()
  @IsNotEmpty()
  owner: string;

  @ApiProperty({ description: 'Record file id' })
  @IsString()
  record: string;
}
