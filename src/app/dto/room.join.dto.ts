import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RoomJoinDto {
  @ApiProperty({ description: 'Name of the room' })
  @IsString()
  @IsNotEmpty()
  room: string;

  @ApiProperty({ description: 'Password for the room' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
