import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation, ConversationDocument } from '../schema/conversation.schema';
import { ConversationCreateDto } from '../dto/conversation.create.dto';
import { ConversationRequestDto } from '../dto/conversation.request.dto';
import { ConversationUpdateDto } from '../dto/conversation.update.dto';

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

  public async findConversation(conversationList: Conversation[]): Promise<Conversation[]> {
    const conversations = await this.conversationModel
      .find({
        _id: {
          $in: conversationList,
        },
      })
      .exec();

    if (conversations.length === 0) throw new NotFoundException('Conversations not found');

    return conversations;
  }

  public async updateConversation(
    conversationId: string,
    conversationUpdateDto: ConversationUpdateDto,
  ): Promise<Conversation> {
    const updatedConversation = await this.conversationModel.findByIdAndUpdate(conversationId, conversationUpdateDto, {
      new: true,
    });

    if (!updatedConversation) throw new NotFoundException(`Conversation with ID ${conversationId} not found`);

    return updatedConversation;
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
