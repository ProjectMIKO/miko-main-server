import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class PublisherResponseDto {
  @IsString()
  readonly streamId: string;

  @IsNumber()
  readonly createdAt: number;

  @IsBoolean()
  readonly hasAudio: boolean;

  @IsBoolean()
  readonly hasVideo: boolean;

  @IsBoolean()
  readonly audioActive: boolean;

  @IsBoolean()
  readonly videoActive: boolean;

  @IsNumber()
  readonly frameRate: number;

  @IsString()
  readonly typeOfVideo: string;

  @IsString()
  readonly videoDimensions: string;
}
