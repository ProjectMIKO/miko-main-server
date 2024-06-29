import { Conversation } from 'components/conversation/schema/conversation.schema';
import { Vertex } from 'components/vertex/schema/vertex.schema';
import { Edge } from 'components/edge/schema/edge.schema';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Meeting } from '../schema/meeting.schema';

export class MeetingFindResponseDto {
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

  constructor(meeting: Meeting) {
    this.conversationIds = meeting.conversations;
    this.vertexIds = meeting.vertexes;
    this.edgeIds = meeting.edges;
  }
}
