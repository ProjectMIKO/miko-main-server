import { Conversation } from 'components/conversation/schema/conversation.schema';
import { Vertex } from 'components/vertex/schema/vertex.schema';
import { Edge } from 'components/edge/schema/edge.schema';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Meeting } from '../schema/meeting.schema';

export class MeetingFindResponseDto {
  @ApiProperty({ description: 'Meeting Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Meeting Host' })
  @IsString()
  @IsNotEmpty()
  owner: string;

  @ApiProperty({ description: 'Meeting date' })
  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty({ description: 'Meeting end date' })
  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @ApiProperty({ description: 'Conversation List' })
  @IsString()
  @IsNotEmpty()
  conversationIds: Conversation[];

  @ApiProperty({ description: 'Vertex List' })
  @IsString()
  @IsNotEmpty()
  vertexIds: Vertex[];

  @ApiProperty({ description: 'Edge List' })
  @IsString()
  @IsNotEmpty()
  edgeIds: Edge[];

  @ApiProperty({ description: 'Record file id' })
  @IsString()
  record: string;

  constructor(meeting: Meeting) {
    this.title = meeting.title;
    this.startTime = meeting.startTime;
    this.endTime = meeting.endTime;
    this.conversationIds = meeting.conversations;
    this.vertexIds = meeting.vertexes;
    this.edgeIds = meeting.edges;
    this.record = meeting.record;
  }
}
