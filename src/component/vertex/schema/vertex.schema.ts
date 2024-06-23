import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VertexDocument = Vertex & Document;

@Schema()
export class Vertex {
  @Prop({ required: true })
  id: number; // 고유 ID

  @Prop({ required: true })
  keyword: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ type: [Number], default: [] })
  conversationIds: number[];
}

export const VertexSchema = SchemaFactory.createForClass(Vertex);
