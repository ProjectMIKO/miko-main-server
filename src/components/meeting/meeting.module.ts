import { Module } from '@nestjs/common';
import { MeetingService } from './service/meeting.service';
import { MeetingController } from './controller/meeting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Meeting, MeetingSchema } from './schema/meeting.schema';
import { GlobalExceptionsFilter } from '@global/filter/global.exceptions.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }])],
  controllers: [MeetingController],
  providers: [MeetingService, { provide: APP_FILTER, useClass: GlobalExceptionsFilter }],
  exports: [MeetingService],
})
export class MeetingModule {}
