import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { Meeting, MeetingSchema } from './schemas/meeting.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }]),
  ],
  controllers: [MeetingController],
  providers: [MeetingService],
})
export class MeetingModule {}
