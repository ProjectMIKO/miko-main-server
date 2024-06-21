import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NodeDocument = Node & Document;

@Schema()
export class Node {
  @Prop({ required: true })
  id: number; // 고유 ID

  @Prop({ required: true })
  keyword: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ type: [Number], default: [] })
  conversationIds: number[];
}

export const NodeSchema = SchemaFactory.createForClass(Node);
