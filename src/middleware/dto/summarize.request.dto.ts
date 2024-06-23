import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class SummarizeRequestDto {
  @ApiProperty({
    description: 'The text message to be summarized',
    example: 'This is a sample text that needs to be summarized.',
  })
  @IsArray()
  conversations: any;
}
