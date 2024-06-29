import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Meeting, MeetingDocument } from '../schema/meeting.schema';
import { MeetingCreateDto } from '../dto/meeting.create.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InvalidResponseException } from 'assets/global/exception/invalidResponse.exception';

@Injectable()
export class MeetingService {
  constructor(@InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>) {}

  validateField(field: string) {
    if (!['conversations', 'vertexes', 'edges'].includes(field))
      throw new BadRequestException(`Invalid field: ${field}`);
  }

  validateAction(action: string) {
    if (!['$push', '$pull'].includes(action)) throw new BadRequestException(`Invalid action: ${action}`);
  }

  public async createNewMeeting(meetingCreateDto: MeetingCreateDto): Promise<string> {
    const meetingModel = new this.meetingModel({
      ...meetingCreateDto,
      startTime: new Date(),
    });

    meetingModel.save().catch((error) => {
      throw new InvalidResponseException('CreateNewMeeting');
    });

    return meetingModel._id.toString();
  }

  public async findAllByOwner(ownerId: string): Promise<Meeting[]> {
    if (!Types.ObjectId.isValid(ownerId)) {
      throw new NotFoundException('Invalid owner ID');
    }

    const meetings = await this.meetingModel.find({ owner: ownerId }).exec();
    if (!meetings.length) {
      throw new NotFoundException('No meetings found for this owner');
    }

    return meetings;
  }

  async findOne(id: string): Promise<Meeting> {
    const meeting = await this.meetingModel.findById(id);

    if (!meeting) throw new NotFoundException(`Meeting with ID ${id} not found`);

    return meeting;
  }

  async remove(id: string): Promise<any> {
    return this.meetingModel.findByIdAndDelete(id).exec();
  }

  async updateMeetingField(meetingId: string, contentId: string, field: string, action: string): Promise<string> {
    this.validateField(field);
    this.validateAction(action);

    const update = { [action]: { [field]: contentId } };

    try {
      const meetingModel = await this.meetingModel
        .findByIdAndUpdate(meetingId, update, {
          new: true,
          useFindAndModify: false,
        })
        .populate(field)
        .exec();

      return meetingModel._id.toString();
    } catch (error) {
      throw error;
    }
  }
}
