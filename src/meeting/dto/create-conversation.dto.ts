import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConversationDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({ description: 'Conversation content' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
