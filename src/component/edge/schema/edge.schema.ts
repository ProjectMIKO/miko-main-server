import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EdgeDocument = Edge & Document;

@Schema()
export class Edge {
  @Prop({ required: true })
  from: number; // 참조하는 Node ID

  @Prop({ required: true })
  to: number; // 참조하는 Node ID

  @Prop({ required: true })
  relationship: string;
}

export const EdgeSchema = SchemaFactory.createForClass(Edge);
