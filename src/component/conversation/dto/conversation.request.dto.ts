import { ApiProperty } from '@nestjs/swagger';

export class ConversationRequestDto {
  @ApiProperty({ description: 'List of conversation IDs' })
  conversationIdList: string[];
}