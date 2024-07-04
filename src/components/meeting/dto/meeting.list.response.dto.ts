import { ApiProperty } from '@nestjs/swagger';

export class MeetingListResponseDto {
  @ApiProperty({ example: '60c72b2f9b1e8a5f2c5e7d2e', description: 'The ID of the meeting' })
  meeting_id: string;

  @ApiProperty({ example: 'Team Meeting', description: 'The title of the meeting' })
  title: string;

  @ApiProperty({ example: ['60c72b2f9b1e8a5f2c5e7d2f'], description: 'The owner(s) of the meeting' })
  owner: string[];

  @ApiProperty({ example: '2021-06-14T12:00:00Z', description: 'The start time of the meeting', required: false })
  startTime: Date;
}
