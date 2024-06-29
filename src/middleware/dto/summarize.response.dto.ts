import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class SummaryBody {
  @ApiProperty({ description: 'Keyword of the main item' })
  @IsString()
  @IsNotEmpty()
  keyword: string;

  @ApiProperty({ description: 'Title of the main item' })
  @IsString()
  @IsNotEmpty()
  subject: string;
}

export class SummarizeResponseDto {
  @ApiProperty({ description: 'Main item', type: SummaryBody })
  @ValidateNested()
  @Type(() => SummaryBody)
  readonly main: SummaryBody;

  @ApiProperty({ description: 'Sub-items', type: [SummaryBody] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SummaryBody)
  readonly sub: SummaryBody[];
}
