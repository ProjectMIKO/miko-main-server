import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class MomRequestDto {
  @ApiProperty({
    description:
      'A list of conversations for generating the minutes of the meeting. Each item represents an individual conversation.',
  })
  @IsArray()
  conversations: any[];

  @ApiProperty({
    description: 'Key points summarizing the main items discussed in the conversations.',
  })
  @IsArray()
  vertexes: any[];
}
