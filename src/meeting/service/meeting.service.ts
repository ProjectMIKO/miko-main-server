import { Injectable } from '@nestjs/common';
import { Meeting, MeetingDocument } from '@schema/meeting.schema';
import { MeetingCreateDto } from '@dto/meeting.create.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InvalidResponseException } from '@global/exception/invalidResponse.exception';

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

    meetingModel.save().catch((error) => {
      throw new InvalidResponseException('CreateNewMeeting');
    });

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

  public async addConversationToMeeting(meetingId: string, conversationId: string): Promise<string> {
    const meetingModel = await this.meetingModel.findByIdAndUpdate(
      meetingId,
      { $push: { conversations: conversationId } },
      { new: true, useFindAndModify: false },
    ).populate('conversations').exec();

    return meetingModel._id.toString() ;
  }

  public async addVertexToMeeting(meetingId: string, vertexId: string): Promise<string> {
    const meetingModel = await this.meetingModel.findByIdAndUpdate(
      meetingId,
      { $push: { vertexes: vertexId } },
      { new: true, useFindAndModify: false },
    ).populate('vertexes').exec();

    return meetingModel._id.toString() ;
  }
}
