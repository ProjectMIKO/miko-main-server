import { Injectable, NotFoundException } from '@nestjs/common';
import { ConversationCreateDto } from '../dto/conversation.create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation, ConversationDocument } from '@conversation/schema/conversation.schema';
import { ConversationRequestDto } from '@conversation/dto/conversation.request.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
  ) {}

  public async createConversation(conversationCreateDto: ConversationCreateDto): Promise<string> {
    const conversationModel = new this.conversationModel(conversationCreateDto);
    await conversationModel.save();

    console.log('CreateNewConversation ID: ' + conversationModel._id.toString());

    return conversationModel._id.toString();
  }

  public async findConversation(conversationRequestDto: ConversationRequestDto): Promise<Conversation[]> {
    const { conversationIdList } = conversationRequestDto;

    const conversations = await this.conversationModel
      .find({
        _id: {
          $in: conversationIdList,
        },
      })
      .exec();

    if (conversations.length === 0) throw new NotFoundException('Conversations not found');

    return conversations;
  }

  public async deleteConversations(conversationRequestDto: ConversationRequestDto): Promise<{ deletedCount: number }> {
    const { conversationIdList } = conversationRequestDto;

    const result = await this.conversationModel
      .deleteMany({
        _id: {
          $in: conversationIdList,
        },
      })
      .exec();

    if (result.deletedCount === 0) throw new NotFoundException('No conversations were deleted');

    return { deletedCount: result.deletedCount };
  }
}
