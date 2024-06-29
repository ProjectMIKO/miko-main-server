import { ApiProperty } from '@nestjs/swagger';
import { EdgeEditRequestDto } from './edge.edit.request.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class EdgeEditReponseDto extends EdgeEditRequestDto {
  @ApiProperty({ description: 'Content ID' })
  @IsString()
  @IsNotEmpty()
  _id: string;

  constructor(_id: string, edgeEditRequestDto: EdgeEditRequestDto) {
    super();
    this._id = _id;
    this.vertex1 = edgeEditRequestDto.vertex1;
    this.vertex2 = edgeEditRequestDto.vertex2;
  }
}
