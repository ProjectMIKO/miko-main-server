import { ApiProperty } from '@nestjs/swagger';
import { VertexCreateRequestDto } from './vertex.create.request.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class VertexCreateResponseDto extends VertexCreateRequestDto {
  @ApiProperty({ description: 'Content ID' })
  @IsString()
  @IsNotEmpty()
  _id: string;

  constructor(_id: string, vertexCreateDto: VertexCreateRequestDto) {
    super();
    this._id = _id;
    this.keyword = vertexCreateDto.keyword;
    this.subject = vertexCreateDto.subject;
    this.conversationIds = vertexCreateDto.conversationIds;
  }
}
