import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SummarizeRequestDto {
  @ApiProperty({
    description: 'The text message to be summarized',
    example: 'This is a sample text that needs to be summarized.',
  })
  @IsString()
  readonly script: string;
}
