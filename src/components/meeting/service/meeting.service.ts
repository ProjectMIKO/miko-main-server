import { BadRequestException, Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { Meeting, MeetingDocument } from '../schema/meeting.schema';
import { MeetingCreateDto } from '../dto/meeting.create.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InvalidResponseException } from 'assets/global/exception/invalidResponse.exception';
import { GlobalExceptionsFilter } from '@global/filter/global.exceptions.filter';
import { MeetingFindResponseDto } from '../dto/meeting.find.response.dto';
import { MeetingUpdateDto } from '../dto/meeting.update.dto';
import { MeetingListResponseDto } from '../dto/meeting.list.response.dto';
import { MomResponseDto } from '@middleware/dto/mom.response.dto';
import { Mom, MomDocument } from '../schema/mom.schema';

@Injectable()
@UseFilters(GlobalExceptionsFilter)
export class MeetingService {
  constructor(
    @InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>,
    @InjectModel(Mom.name) private momModel: Model<MomDocument>,
  ) {}

  validateField(field: string) {
    if (!['owner', 'conversations', 'vertexes', 'edges', 'record', 'startTime', 'endTime', 'mom'].includes(field))
      throw new BadRequestException(`Invalid field: ${field}`);
  }

  validateAction(action: string) {
    if (!['$push', '$pull', '$set'].includes(action)) throw new BadRequestException(`Invalid action: ${action}`);
  }

  public async createNewMeeting(meetingCreateDto: MeetingCreateDto): Promise<string> {
    const meeting = new this.meetingModel({ ...meetingCreateDto, owner: [meetingCreateDto.owner] });

    try {
      await meeting.save();
    } catch (error) {
      throw new InvalidResponseException('CreateNewMeeting');
    }

    return meeting._id.toString();
  }

  public async findAllByOwner(ownerId: string): Promise<MeetingListResponseDto[]> {
    const meetings = await this.meetingModel.find({ owner: ownerId }).exec();

    if (!meetings.length) {
      throw new NotFoundException('No meetings found for this owner');
    }

    return meetings.map((meeting) => ({
      meeting_id: meeting._id.toString(),
      title: meeting.title,
      startTime: meeting.startTime,
      owner: meeting.owner,
    }));
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

  async createMom(momResponseDto: MomResponseDto): Promise<Mom> {
    const mom = new this.momModel(momResponseDto);

    try {
      await mom.save();
    } catch (error) {
      throw new Error('Failed to save Mom');
    }

    return mom;
  }

  async findMom(momId: string): Promise<MomResponseDto> {
    const mom = await this.momModel.findById(momId);

    if (!mom) throw new NotFoundException(`MOM with ID ${momId} not found`);

    const momResponseDto = new MomResponseDto(mom);

    return momResponseDto;
  }

}
