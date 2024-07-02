import { ApiProperty } from '@nestjs/swagger';

export class RoomJoinDto {
  @ApiProperty({ description: 'Name of the room' })
  room: string;

  @ApiProperty({ description: 'Password for the room' })
  password: string;
}
