import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type EdgeDocument = Edge & Document;

@Schema()
export class Edge {
  @ApiProperty({ description: 'ID of the first vertex' })
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  vertex1: string;

  @ApiProperty({ description: 'ID of the second vertex' })
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  vertex2: string;
}

export const EdgeSchema = SchemaFactory.createForClass(Edge);
