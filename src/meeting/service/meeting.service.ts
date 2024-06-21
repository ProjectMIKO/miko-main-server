import { Injectable } from '@nestjs/common';
import { MeetingCreateDto } from '../dto/meeting.create.dto';

@Injectable()
export class MeetingService {
  create(createMeetingDto: MeetingCreateDto) {
    return 'This action adds a new meeting';
  }

  findAll() {
    return `This action returns all meeting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meeting`;
  }

  remove(id: number) {
    return `This action removes a #${id} meeting`;
  }
}
