import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RoomCreateDto {
  @ApiProperty({ description: 'Nickname of the user' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ description: 'Name of the room' })
  @IsString()
  @IsNotEmpty()
  room: string;

  @ApiProperty({ description: 'Password for the room' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
