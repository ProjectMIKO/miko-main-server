import { Conversation } from 'components/conversation/schema/conversation.schema';
import { Vertex } from 'components/vertex/schema/vertex.schema';
import { Edge } from 'components/edge/schema/edge.schema';
import { IsDate, IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Meeting } from '../schema/meeting.schema';

export class MeetingFindResponseDto {
  @ApiProperty({ description: 'Meeting Title', example: 'Project Update Meeting' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Meeting Host', example: 'John Doe' })
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  owner: string[];

  @ApiProperty({ description: 'Meeting start date', example: '2024-07-04T09:00:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty({ description: 'Meeting end date', example: '2024-07-04T11:00:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @ApiProperty({ description: 'List of conversations', type: [Conversation] })
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  conversationIds: Conversation[];

  @ApiProperty({ description: 'List of vertexes', type: [Vertex] })
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  vertexIds: Vertex[];

  @ApiProperty({ description: 'List of edges', type: [Edge] })
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  edgeIds: Edge[];

  @ApiProperty({ description: 'Record file ID', example: 'record12345' })
  @IsString()
  record: string;

  constructor(meeting: Meeting) {
    this.title = meeting.title;
    this.owner = meeting.owner;
    this.startTime = meeting.startTime;
    this.endTime = meeting.endTime;
    this.conversationIds = meeting.conversations;
    this.vertexIds = meeting.vertexes;
    this.edgeIds = meeting.edges;
    this.record = meeting.record;
  }
}
