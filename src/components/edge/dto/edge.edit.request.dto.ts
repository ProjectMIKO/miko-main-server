import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EdgeEditRequestDto {
  @ApiProperty({ description: 'Source node ID' })
  @IsString()
  @IsNotEmpty()
  vertex1: string;

  @ApiProperty({ description: 'Destination node ID' })
  @IsString()
  @IsNotEmpty()
  vertex2: string;

  @ApiProperty({ description: 'Destination node ID' })
  @IsString()
  @IsNotEmpty()
  action: string;
}
