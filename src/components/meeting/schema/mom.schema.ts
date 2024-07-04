import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ParticipantDto } from '@middleware/dto/mom.response.dto';

export type MomDocument = Mom & Document;

@Schema()
export class Mom {
  @ApiProperty({ description: '회의록 ID' })
  _id: string;

  @ApiProperty({ description: '회의 제목' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: '회의 날짜' })
  @Prop({ required: true })
  startTime: Date;

  @ApiProperty({ description: '회의 기간' })
  @Prop({ required: true })
  period: number;

  @ApiProperty({ description: '참석자 목록', type: [ParticipantDto] })
  @Prop({ type: [{ name: String, role: String }], required: true })
  participants: ParticipantDto[];

  @ApiProperty({ description: '회의록 요약' })
  @Prop({ required: true })
  mom: string;
}

export const MomSchema = SchemaFactory.createForClass(Mom);
