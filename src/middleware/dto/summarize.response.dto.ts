import { ApiProperty } from '@nestjs/swagger';

export class SummarizeResponseDto {
  @ApiProperty({
    description: 'The summarized keyword from the provided text',
    example: 'Innovation',
  })
  readonly keyword: string;

  @ApiProperty({
    description: 'The cost of the summarization request',
    example: 0.005,
  })
  readonly cost: number;
}
