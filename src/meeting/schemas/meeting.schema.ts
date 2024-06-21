import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Conversation, ConversationSchema } from './conversation.schema';
import { Node, NodeSchema } from './node.schema';
import { Edge, EdgeSchema } from './edge.schema';

export type MeetingDocument = Meeting & Document;

@Schema()
export class Meeting {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  hostId: Types.ObjectId;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ type: [ConversationSchema], default: [] })
  conversations: Conversation[];

  @Prop({ default: 0 })
  conversationIdCounter: number; // 각 미팅 방마다 고유한 Conversation ID를 관리

  @Prop({ type: [NodeSchema], default: [] })
  nodes: Node[];

  @Prop({ type: [EdgeSchema], default: [] })
  edges: Edge[];
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
