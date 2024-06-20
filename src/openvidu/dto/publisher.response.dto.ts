import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class PublisherResponseDto {
  @ApiProperty({ description: 'ID of the stream' })
  @IsString()
  readonly streamId: string;

  @ApiProperty({ description: 'Timestamp when the stream was created' })
  @IsNumber()
  readonly createdAt: number;

  @ApiProperty({ description: 'Indicates if the stream has audio' })
  @IsBoolean()
  readonly hasAudio: boolean;

  @ApiProperty({ description: 'Indicates if the stream has video' })
  @IsBoolean()
  readonly hasVideo: boolean;

  @ApiProperty({ description: 'Indicates if the audio is active' })
  @IsBoolean()
  readonly audioActive: boolean;

  @ApiProperty({ description: 'Indicates if the video is active' })
  @IsBoolean()
  readonly videoActive: boolean;

  @ApiProperty({ description: 'Frame rate of the video' })
  @IsNumber()
  readonly frameRate: number;

  @ApiProperty({ description: 'Type of video' })
  @IsString()
  readonly typeOfVideo: string;

  @ApiProperty({ description: 'Dimensions of the video' })
  @IsString()
  readonly videoDimensions: string;
}
