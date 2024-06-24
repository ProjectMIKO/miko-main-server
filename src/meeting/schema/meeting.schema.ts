import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Conversation } from '@schema/conversation.schema';
import { Vertex } from '@schema/vertex.schema';
import { Edge, EdgeSchema } from '@schema/edge.schema';

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
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
