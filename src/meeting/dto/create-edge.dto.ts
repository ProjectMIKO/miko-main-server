import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEdgeDto {
  @ApiProperty({ description: 'Source node ID' })
  @IsNumber()
  @IsNotEmpty()
  from: number;

  @ApiProperty({ description: 'Destination node ID' })
  @IsNumber()
  @IsNotEmpty()
  to: number;

  @ApiProperty({ description: 'Relationship description' })
  @IsString()
  @IsNotEmpty()
  relationship: string;
}
