import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MeetingUpdateDto {
  @ApiProperty({ description: 'Meeting ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Content' })
  @IsNotEmpty()
  value: any;

  @ApiProperty({
    description: 'Field to update',
    enum: ['title', 'owner', 'conversations', 'vertexes', 'edges', 'record', 'startTime', 'endTime'],
  })
  @IsString()
  @IsNotEmpty()
  field: string;

  @ApiProperty({ description: 'Action to perform', enum: ['$push', '$pull', '$set'] })
  @IsString()
  @IsNotEmpty()
  @IsIn(['$push', '$pull', '$set'])
  action: string;
}
