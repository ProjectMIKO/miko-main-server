import { ApiProperty } from '@nestjs/swagger';

export class MeetingListResponseDto {
  @ApiProperty({ example: '60c72b2f9b1e8a5f2c5e7d2e', description: 'The ID of the meeting' })
  _id: string;

  @ApiProperty({ example: 'Team Meeting', description: 'The title of the meeting' })
  title: string;
}
