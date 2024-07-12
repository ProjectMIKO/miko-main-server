import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VertexDocument = Vertex & Document;

@Schema()
export class Vertex {
  @Prop({ required: true })
  keyword: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  priority: number;

  @Prop({ type: [String], default: [] })
  conversationIds: string[];
}

export const VertexSchema = SchemaFactory.createForClass(Vertex);
