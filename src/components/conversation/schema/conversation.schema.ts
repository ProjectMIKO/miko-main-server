import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
  @ApiProperty({ description: 'User who created the conversation' })
  @Prop({ required: true })
  user: string;

  @ApiProperty({ description: 'Content of the conversation' })
  @Prop({ required: true })
  script: string;

  @ApiProperty({ description: 'Timestamp of the conversation' })
  @Prop({ required: true })
  timestamp: Date;

  @ApiProperty({ description: 'Recording time offset' })
  @Prop({ required: true })
  time_offset: number;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
