import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class ParticipantDto {
  @ApiProperty({ description: '참석자 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '참석자 역할' })
  @IsString()
  @IsNotEmpty()
  role: string;
}

export class MomResponseDto {
  @ApiProperty({ description: '회의 제목' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '회의 날짜' })
  @IsDate()
  @Type(() => Date)
  startTime: Date;

  @ApiProperty({ description: '회의 기간' })
  @IsString()
  period: String;

  @ApiProperty({ description: '참석자 목록' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParticipantDto)
  participants: ParticipantDto[];

  @ApiProperty({ description: '회의록 요약' })
  @IsString()
  @IsNotEmpty()
  summary: string;
}
