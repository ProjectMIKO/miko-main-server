import { IsNotEmpty, IsString } from 'class-validator';

export class ConversationUpdateDto {
  @IsNotEmpty()
  @IsString()
  script: string;
}
