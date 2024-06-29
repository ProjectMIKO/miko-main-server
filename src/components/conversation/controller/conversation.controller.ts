import { Body, Controller, Delete, Get } from '@nestjs/common';
import { ConversationService } from 'components/conversation/service/conversation.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConversationRequestDto } from 'components/conversation/dto/conversation.request.dto';
import { Conversation } from 'components/conversation/schema/conversation.schema';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  // @Get()
  // @ApiOperation({ summary: 'Find conversations by IDs' })
  // @ApiResponse({ status: 200, description: 'Successful retrieval of conversations', type: [Conversation] })
  // @ApiBody({ type: ConversationRequestDto })
  // public async findConversation(@Body() conversationRequestDto: ConversationRequestDto) {
  //   return this.conversationService.findConversation(conversationRequestDto);
  // }

  @Delete()
  @ApiOperation({ summary: 'Delete conversations by IDs' })
  @ApiResponse({ status: 200, description: 'Successful deletion of conversations' })
  @ApiBody({ type: ConversationRequestDto })
  public async deleteConversations(@Body() conversationRequestDto: ConversationRequestDto) {
    return this.conversationService.deleteConversations(conversationRequestDto);
  }
}
