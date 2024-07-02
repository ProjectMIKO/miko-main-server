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

  @ApiProperty({ description: 'Field to update' })
  @IsString()
  @IsNotEmpty()
  field: string;

  @ApiProperty({ description: 'Action to perform', enum: ['$push', '$pull'] })
  @IsString()
  @IsNotEmpty()
  @IsIn(['$push', '$pull'])
  action: string;
}
