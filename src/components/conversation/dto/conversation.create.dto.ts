import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConversationCreateDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({ description: 'Conversation content' })
  @IsString()
  @IsNotEmpty()
  script: string;

  @ApiProperty({ description: 'Conversation time' })
  @IsDate()
  @IsNotEmpty()
  timestamp: Date;
}
