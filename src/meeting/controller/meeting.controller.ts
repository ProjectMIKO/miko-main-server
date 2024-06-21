import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeetingService } from '../service/meeting.service';
import { MeetingCreateDto } from '../dto/meeting.create.dto';

@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post()
  create(@Body() createMeetingDto: MeetingCreateDto) {
    return this.meetingService.create(createMeetingDto);
  }

  @Get()
  findAll() {
    return this.meetingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetingService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetingService.remove(+id);
  }
}
