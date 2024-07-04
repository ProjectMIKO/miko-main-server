import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ConversationDocument = Conversation & Document;

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Conversation {
  @ApiProperty({ description: 'Conversation ID' })
  id: string;

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
