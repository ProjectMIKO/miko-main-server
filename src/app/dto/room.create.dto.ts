import { ApiProperty } from '@nestjs/swagger';

export class RoomCreateDto {
  @ApiProperty({ description: 'Nickname of the user' })
  nickname: string;

  @ApiProperty({ description: 'Name of the room' })
  room: string;

  @ApiProperty({ description: 'Password for the room' })
  password: string;
}
