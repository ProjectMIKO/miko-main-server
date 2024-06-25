import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Meeting, MeetingDocument } from '../schema/meeting.schema';
import { MeetingCreateDto } from '../dto/meeting.create.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InvalidResponseException } from '@global/exception/invalidResponse.exception';

@Injectable()
export class MeetingService {
  constructor(
    @InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>,
  ) {}

  validateField(field: string) {
    if (!['conversations', 'vertexes', 'edges'].includes(field))
      throw new BadRequestException(`Invalid field: ${field}`);
  }

  validateAction(action: string) {
    if (!['$push', '$pull'].includes(action))
      throw new BadRequestException(`Invalid action: ${action}`);
  }

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

  async updateMeetingField(
    meetingId: string,
    contentId: string,
    field: string,
    action: string,
  ): Promise<string> {
    this.validateField(field);
    this.validateAction(action);

    const update = { [action]: { [field]: contentId } };
    const meetingModel = await this.meetingModel
      .findByIdAndUpdate(meetingId, update, {
        new: true,
        useFindAndModify: false,
      })
      .populate(field)
      .exec();

    if (!meetingModel) {
      throw new NotFoundException(`Meeting ID ${meetingId}: Not found`);
    }

    return meetingModel._id.toString();
  }
}