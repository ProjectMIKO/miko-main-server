import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNodeDto {
  @ApiProperty({ description: 'Node keyword' })
  @IsString()
  @IsNotEmpty()
  keyword: string;

  @ApiProperty({ description: 'Node summary' })
  @IsString()
  @IsNotEmpty()
  summary: string;

  @ApiProperty({
    description: 'List of conversation IDs associated with this node',
  })
  @IsArray()
  @ArrayNotEmpty()
  conversationIds: number[];
}
