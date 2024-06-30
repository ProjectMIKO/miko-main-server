import { Module } from '@nestjs/common';
import { MeetingService } from './service/meeting.service';
import { MeetingController } from './controller/meeting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Meeting, MeetingSchema } from './schema/meeting.schema';
import { GlobalExceptionsFilter } from '@global/filter/global.exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
import { ConversationModule } from 'components/conversation/conversation.module';
import { VertexModule } from 'components/vertex/vertex.module';
import { EdgeModule } from 'components/edge/edge.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }]),
    ConversationModule,
    VertexModule,
    EdgeModule,
  ],
  controllers: [MeetingController],
  providers: [MeetingService],
  exports: [MeetingService],
})
export class MeetingModule {}
