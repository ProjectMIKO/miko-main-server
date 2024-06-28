import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VertexCreateRequestDto {
  @ApiProperty({ description: 'Node keyword' })
  @IsString()
  @IsNotEmpty()
  keyword: string;

  @ApiProperty({ description: 'Node summary' })
  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @ApiProperty({
    description: 'List of conversation IDs associated with this node',
  })
  @IsArray()
  @ArrayNotEmpty()
  conversationIds: string[];
}
