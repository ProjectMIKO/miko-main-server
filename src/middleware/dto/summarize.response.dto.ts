import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class SummaryBody {
  @ApiProperty({ description: 'Keyword of the item' })
  @IsString()
  @IsNotEmpty()
  keyword: string;

  @ApiProperty({ description: 'Title of the item' })
  @IsString()
  @IsNotEmpty()
  subject: string;
}

export class Sub2Item {
  @ApiProperty({ description: 'Sub2 item', type: SummaryBody })
  @ValidateNested()
  @Type(() => SummaryBody)
  sub2: SummaryBody[];
}

export class Sub1Item {
  @ApiProperty({ description: 'Sub1 item', type: SummaryBody })
  @ValidateNested()
  @Type(() => SummaryBody)
  sub1: SummaryBody;

  @ApiProperty({ description: 'Sub2 items', type: [Sub2Item] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Sub2Item)
  sub2: Sub2Item[];
}

export class Idea {
  @ApiProperty({ description: 'Main item', type: SummaryBody })
  @ValidateNested()
  @Type(() => SummaryBody)
  main: SummaryBody;

  @ApiProperty({ description: 'Sub1 items', type: [Sub1Item] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Sub1Item)
  sub1: Sub1Item[];
}

export class SummarizeResponseDto {
  @ApiProperty({ description: 'Idea array', type: [Idea] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Idea)
  idea: Idea[];
}
