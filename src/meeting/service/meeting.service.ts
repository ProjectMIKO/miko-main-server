import { Injectable } from '@nestjs/common';
import { Meeting, MeetingDocument } from '@schema/meeting.schema';
import { MeetingCreateDto } from '@dto/meeting.create.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MeetingService {
  constructor(
    @InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>,
  ) {}

  public async createNewMeeting(
    meetingCreateDto: MeetingCreateDto,
  ): Promise<string> {
    const meetingModel = new this.meetingModel({
      ...meetingCreateDto,
      startTime: new Date(),
    });
    await meetingModel.save();

    return meetingModel._id.toString();
  }

  async findAll(): Promise<Meeting[]> {
    return this.meetingModel.find().exec();
  }

  async findOne(id: string): Promise<Meeting> {
    return this.meetingModel.findById(id).exec();
  }

  async remove(id: string): Promise<any> {
    return this.meetingModel.findByIdAndDelete(id).exec();
  }
}
