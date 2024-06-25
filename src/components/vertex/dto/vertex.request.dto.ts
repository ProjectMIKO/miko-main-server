import { ApiProperty } from '@nestjs/swagger';

export class VertexRequestDto {
  @ApiProperty({ description: 'List of vertex IDs' })
  vertexIdList: string[];
}
