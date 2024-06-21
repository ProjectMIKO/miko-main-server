import { Module } from '@nestjs/common';
import { MeetingService } from './service/meeting.service';
import { MeetingController } from './controller/meeting.controller';

@Module({
  controllers: [MeetingController],
  providers: [MeetingService],
})
export class MeetingModule {}
