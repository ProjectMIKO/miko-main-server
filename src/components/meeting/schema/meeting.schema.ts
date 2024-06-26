import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Conversation } from 'components/conversation/schema/conversation.schema';
import { Vertex } from 'components/vertex/schema/vertex.schema';
import { Edge, EdgeSchema } from 'components/edge/schema/edge.schema';
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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Edge' }], default: [] })
  edges: Edge[];

  @Prop()
  record: string;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
