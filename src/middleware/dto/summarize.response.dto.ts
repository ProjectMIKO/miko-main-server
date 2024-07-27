import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class SummaryBody {
  @ApiProperty({ description: 'Keyword of the item' })
  @IsString()
  @IsNotEmpty()
  keyword: string;

  @ApiProperty({ description: 'Title of the item' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'Sub items', type: [SummaryBody], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SummaryBody)
  @IsOptional()
  sub?: SummaryBody[];
}

export class Idea {
  @ApiProperty({ description: 'Main item', type: SummaryBody })
  @ValidateNested()
  @Type(() => SummaryBody)
  main: SummaryBody;

  @ApiProperty({ description: 'Sub items', type: [SummaryBody], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SummaryBody)
  @IsOptional()
  sub?: SummaryBody[];
}

export class SummarizeResponseDto {
  @ApiProperty({ description: 'Idea array', type: [Idea] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Idea)
  idea: Idea[];
}
