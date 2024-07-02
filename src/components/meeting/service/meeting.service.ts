import { BadRequestException, Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { Meeting, MeetingDocument } from '../schema/meeting.schema';
import { MeetingCreateDto } from '../dto/meeting.create.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InvalidResponseException } from 'assets/global/exception/invalidResponse.exception';
import { GlobalExceptionsFilter } from '@global/filter/global.exceptions.filter';
import { MeetingFindResponseDto } from '../dto/meeting.find.response.dto';
import { MeetingUpdateDto } from '../dto/meeting.update.dto';

@Injectable()
@UseFilters(GlobalExceptionsFilter)
export class MeetingService {
  constructor(@InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>) {}

  validateField(field: string) {
    if (!['owner', 'conversations', 'vertexes', 'edges', 'record', 'startTime', 'endTime'].includes(field))
      throw new BadRequestException(`Invalid field: ${field}`);
  }

  validateAction(action: string) {
    if (!['$push', '$pull', '$set'].includes(action)) throw new BadRequestException(`Invalid action: ${action}`);
  }

  public async createNewMeeting(meetingCreateDto: MeetingCreateDto): Promise<string> {
    const meeting = new this.meetingModel({ ...meetingCreateDto });

    meeting.save().catch((error) => {
      throw new InvalidResponseException('CreateNewMeeting');
    });

    return meeting._id.toString();
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

  async findOne(id: string): Promise<MeetingFindResponseDto> {
    const meeting = await this.meetingModel.findById(id);

    if (!meeting) throw new NotFoundException(`Meeting with ID ${id} not found`);

    const meetingFindResponseDto = new MeetingFindResponseDto(meeting);

    return meetingFindResponseDto;
  }

  async remove(id: string): Promise<any> {
    return this.meetingModel.findByIdAndDelete(id).exec();
  }

  async updateMeetingField(meetingUpdateDto: MeetingUpdateDto): Promise<string> {
    this.validateField(meetingUpdateDto.field);
    this.validateAction(meetingUpdateDto.action);

    const update = { [meetingUpdateDto.action]: { [meetingUpdateDto.field]: meetingUpdateDto.value } };

    const meeting = await this.meetingModel
      .findByIdAndUpdate(meetingUpdateDto.id, update, {
        new: true,
        useFindAndModify: false,
      })
      .populate(meetingUpdateDto.field)
      .exec();

    if (!meeting) throw new NotFoundException(`Meeting with ID ${meetingUpdateDto.id} not found`);

    return meeting._id.toString();
  }
}
