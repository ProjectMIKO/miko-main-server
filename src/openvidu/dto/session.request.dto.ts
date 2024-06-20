import {
  IsOptional,
  IsString,
  IsBoolean,
  ValidateNested,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum MediaMode {
  RELAYED = 'RELAYED',
  ROUTED = 'ROUTED',
}

enum RecordingMode {
  ALWAYS = 'ALWAYS',
  MANUAL = 'MANUAL',
}

enum OutputMode {
  COMPOSED = 'COMPOSED',
  COMPOSED_QUICK_START = 'COMPOSED_QUICK_START',
  INDIVIDUAL = 'INDIVIDUAL',
}

enum RecordingLayout {
  BEST_FIT = 'BEST_FIT',
  PICTURE_IN_PICTURE = 'PICTURE_IN_PICTURE',
  VERTICAL_PRESENTATION = 'VERTICAL_PRESENTATION',
  HORIZONTAL_PRESENTATION = 'VERTICAL_PRESENTATION',
  CUSTOM = 'CUSTOM',
}

enum VideoCodec {
  MEDIA_SERVER_PREFERRED = 'MEDIA_SERVER_PREFERRED',
  NONE = 'NONE',
  VP8 = 'VP8',
  VP9 = 'VP9',
  H264 = 'H264',
}

class MediaNodeDto {
  @ApiProperty({ description: 'ID of the media node' })
  @IsString()
  readonly id: string;
}

class RecordingPropertiesDto {
  @ApiPropertyOptional({ description: 'Name of the recording' })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({ description: 'Indicates if the recording has audio' })
  @IsOptional()
  @IsBoolean()
  readonly hasAudio?: boolean;

  @ApiPropertyOptional({ description: 'Indicates if the recording has video' })
  @IsOptional()
  @IsBoolean()
  readonly hasVideo?: boolean;

  @ApiPropertyOptional({
    description: 'Output mode of the recording',
    enum: OutputMode,
  })
  @IsOptional()
  @IsEnum(OutputMode)
  readonly outputMode?: OutputMode;

  @ApiPropertyOptional({
    description: 'Layout of the recording',
    enum: RecordingLayout,
  })
  @IsOptional()
  @IsEnum(RecordingLayout)
  readonly recordingLayout?: RecordingLayout;

  @ApiPropertyOptional({ description: 'Resolution of the recording' })
  @IsOptional()
  @IsString()
  readonly resolution?: string;

  @ApiPropertyOptional({ description: 'Frame rate of the recording' })
  @IsOptional()
  @IsNumber()
  readonly frameRate?: number;

  @ApiPropertyOptional({ description: 'Shared memory size of the recording' })
  @IsOptional()
  @IsNumber()
  readonly shmSize?: number;

  @ApiPropertyOptional({
    description: 'Media node for the recording',
    type: MediaNodeDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MediaNodeDto)
  readonly mediaNode?: MediaNodeDto;
}

export class SessionPropertiesDto {
  @ApiPropertyOptional({
    description: 'Media mode of the session',
    enum: MediaMode,
  })
  @IsOptional()
  @IsEnum(MediaMode)
  readonly mediaMode?: MediaMode;

  @ApiPropertyOptional({
    description: 'Recording mode of the session',
    enum: RecordingMode,
  })
  @IsOptional()
  @IsEnum(RecordingMode)
  readonly recordingMode?: RecordingMode;

  @ApiPropertyOptional({ description: 'Custom session ID' })
  @IsOptional()
  @IsString()
  readonly customSessionId?: string;

  @ApiPropertyOptional({
    description: 'Forced video codec for the session',
    enum: VideoCodec,
  })
  @IsOptional()
  @IsEnum(VideoCodec)
  readonly forcedVideoCodec?: VideoCodec;

  @ApiPropertyOptional({ description: 'Indicates if transcoding is allowed' })
  @IsOptional()
  @IsBoolean()
  readonly allowTranscoding?: boolean;

  @ApiPropertyOptional({
    description: 'Default recording properties',
    type: RecordingPropertiesDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RecordingPropertiesDto)
  readonly defaultRecordingProperties?: RecordingPropertiesDto;

  @ApiPropertyOptional({
    description: 'Media node for the session',
    type: MediaNodeDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MediaNodeDto)
  readonly mediaNode?: MediaNodeDto;
}
