import { IsOptional, IsString, IsBoolean, ValidateNested, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

enum MediaMode {
  RELAYED = "RELAYED",
  ROUTED = "ROUTED"
}

enum RecordingMode {
    ALWAYS = "ALWAYS",
    MANUAL = "MANUAL"
}

enum OutputMode {
  COMPOSED = "COMPOSED",
  COMPOSED_QUICK_START = "COMPOSED_QUICK_START",
  INDIVIDUAL = "INDIVIDUAL"
}

enum RecordingLayout {
  BEST_FIT = "BEST_FIT",
  PICTURE_IN_PICTURE = "PICTURE_IN_PICTURE",
  VERTICAL_PRESENTATION = "VERTICAL_PRESENTATION",
  HORIZONTAL_PRESENTATION = "VERTICAL_PRESENTATION",
  CUSTOM = "CUSTOM"
}

enum VideoCodec {
  MEDIA_SERVER_PREFERRED = "MEDIA_SERVER_PREFERRED",
  NONE = "NONE",
  VP8 = "VP8",
  VP9 = "VP9",
  H264 = "H264"
}

class MediaNodeDto {
  @IsString()
  readonly id: string;
}

class RecordingPropertiesDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsBoolean()
  readonly hasAudio?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly hasVideo?: boolean;

  @IsOptional()
  @IsEnum(OutputMode)
  readonly outputMode?: OutputMode;

  @IsOptional()
  @IsEnum(RecordingLayout)
  readonly recordingLayout?: RecordingLayout;

  @IsOptional()
  @IsString()
  readonly resolution?: string;

  @IsOptional()
  @IsNumber()
  readonly frameRate?: number;

  @IsOptional()
  @IsNumber()
  readonly shmSize?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => MediaNodeDto)
  readonly mediaNode?: MediaNodeDto;
}

export class SessionPropertiesDto {
  @IsOptional()
  @IsEnum(MediaMode)
  readonly mediaMode?: MediaMode;

  @IsOptional()
  @IsEnum(RecordingMode)
  readonly recordingMode?: RecordingMode;

  @IsOptional()
  @IsString()
  readonly customSessionId?: string;

  @IsOptional()
  @IsEnum(VideoCodec)
  readonly forcedVideoCodec?: VideoCodec;

  @IsOptional()
  @IsBoolean()
  readonly allowTranscoding?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => RecordingPropertiesDto)
  readonly defaultRecordingProperties?: RecordingPropertiesDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => MediaNodeDto)
  readonly mediaNode?: MediaNodeDto;
}
