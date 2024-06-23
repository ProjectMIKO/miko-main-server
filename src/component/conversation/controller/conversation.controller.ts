import { Controller } from '@nestjs/common';
import { ConversationService } from '@service/conversation.service';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}
}
