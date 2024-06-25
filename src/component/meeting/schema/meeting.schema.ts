import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Conversation } from '@conversation/schema/conversation.schema';
import { Vertex } from '@vertex/schema/vertex.schema';
import { Edge, EdgeSchema } from '@edge/schema/edge.schema';
import { IsString } from 'class-validator';

export type MeetingDocument = Meeting & Document;

@Schema()
export class Meeting {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;

  @Prop({ required: true })
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Conversation' }], default: [] })
  conversations: Conversation[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Vertex' }], default: [] })
  vertexes: Vertex[];

  @Prop({ type: [EdgeSchema], default: [] })
  edges: Edge[];

  @IsString()
  record: string;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
