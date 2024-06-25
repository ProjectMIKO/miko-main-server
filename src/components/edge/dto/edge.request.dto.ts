import { ApiProperty } from '@nestjs/swagger';

export class EdgeRequestDto {
  @ApiProperty({ description: 'List of edge IDs' })
  edgeIdList: string[];
}