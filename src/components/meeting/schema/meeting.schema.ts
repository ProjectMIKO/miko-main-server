import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Conversation } from 'components/conversation/schema/conversation.schema';
import { Vertex } from 'components/vertex/schema/vertex.schema';
import { Edge, EdgeSchema } from 'components/edge/schema/edge.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export type MeetingDocument = Meeting & Document;

export class Owner {
  @ApiProperty({ description: 'Name of the owner' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Role of the owner' })
  @Prop({ required: true })
  role: string;

  @ApiProperty({ description: 'Image URL of the owner' })
  @Prop({ required: true })
  image: string;
}

@Schema()
export class Meeting {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [Owner], required: true })
  @Type(() => Owner)
  owner: Owner[];

  @Prop({ default: null })
  startTime: Date;

  @Prop({ default: null })
  endTime: Date;

  @Prop({ default: null })
  period: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Conversation' }], default: [] })
  conversations: Conversation[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Vertex' }], default: [] })
  vertexes: Vertex[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Edge' }], default: [] })
  edges: Edge[];

  @Prop({ default: null })
  record: string;

  @Prop({ default: null })
  mom: string;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
