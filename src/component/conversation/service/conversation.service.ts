import { Injectable } from '@nestjs/common';
import { ConversationCreateDto } from '@dto/conversation.create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Conversation,
  ConversationDocument,
} from '@schema/conversation.schema';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
  ) {}

  public async createNewConversation(
    conversationCreateDto: ConversationCreateDto,
  ): Promise<string> {
    const conversationModel = new this.conversationModel(conversationCreateDto);
    await conversationModel.save();

    console.log(
      'CreateNewConversation ID: ' + conversationModel._id.toString(),
    );

    return conversationModel._id.toString();
  }
}
