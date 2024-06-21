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
  hostId: string;

  @ApiProperty({ description: 'Start time' })
  @IsDateString()
  startTime: Date;

  @ApiProperty({ description: 'End time' })
  @IsDateString()
  endTime: Date;
}
