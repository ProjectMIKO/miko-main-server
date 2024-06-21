import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
  @Prop({ required: true })
  id: number; // 고유 ID

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  timestamp: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
