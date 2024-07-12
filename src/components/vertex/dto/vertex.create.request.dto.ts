import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VertexCreateRequestDto {
  @ApiProperty({ description: 'Node keyword' })
  @IsString()
  @IsNotEmpty()
  keyword: string;

  @ApiProperty({ description: 'Node summary' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'Node summary' })
  @IsNumber()
  @IsNotEmpty()
  priority: number;

  @ApiProperty({
    description: 'List of conversation IDs associated with this node',
  })
  @IsArray()
  @ArrayNotEmpty()
  conversationIds: string[];
}
