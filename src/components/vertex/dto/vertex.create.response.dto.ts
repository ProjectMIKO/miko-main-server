import { ApiProperty } from '@nestjs/swagger';
import { VertexCreateRequestDto } from './vertex.create.request.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class VertexCreateResponseDto extends VertexCreateRequestDto {
  @ApiProperty({ description: 'Content ID' })
  @IsString()
  @IsNotEmpty()
  contentId: string;

  constructor(contentId: string, vertexCreateDto: VertexCreateRequestDto) {
    super();
    this.contentId = contentId;
    this.keyword = vertexCreateDto.keyword;
    this.subtitle = vertexCreateDto.subtitle;
    this.conversationIds = vertexCreateDto.conversationIds;
  }
}
