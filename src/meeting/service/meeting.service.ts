import { Injectable } from '@nestjs/common';
import { Meeting, MeetingDocument } from '../schema/meeting.schema';
import { MeetingCreateDto } from '../dto/meeting.create.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NodeCreateDto } from '../dto/node.create.dto';
import { Node, NodeDocument } from '../schema/node.schema';

@Injectable()
export class MeetingService {
  constructor(
    @InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>,
    @InjectModel(Meeting.name) private nodeModel: Model<NodeDocument>,
  ) {}

  public async createNewMeeting(
    meetingCreateDto: MeetingCreateDto,
  ): Promise<boolean> {
    try {
      const meetingModel = new this.meetingModel({
        ...meetingCreateDto,
        startTime: new Date(),
      });
      await meetingModel.save();

      return true;
    } catch (error) {
      return false;
    }
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

  public createNewNode(nodeCreateDto: NodeCreateDto) {
    const nodeModel = new this.nodeModel(nodeCreateDto);
    nodeModel.save().then();
  }
}
