import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Recording, RecordingLayout } from 'openvidu-node-client';

export class StartRecordingDto {
  @ApiProperty({ description: 'ID of the session to record' })
  @IsString()
  readonly sessionId: string;

  @ApiProperty({ description: 'Name of the recording' })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Indicates if the recording should have audio',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly hasAudio?: boolean;

  @ApiProperty({
    description: 'Indicates if the recording should have video',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly hasVideo?: boolean;

  @ApiProperty({
    enum: Recording.OutputMode,
    description: 'Output mode of the recording',
    required: false,
  })
  @IsOptional()
  @IsEnum(Recording.OutputMode)
  readonly outputMode?: Recording.OutputMode;

  @ApiProperty({ description: 'Resolution of the recording', required: false })
  @IsOptional()
  @IsString()
  readonly resolution?: string;

  @ApiProperty({ description: 'Frame rate of the recording', required: false })
  @IsOptional()
  @IsNumber()
  readonly frameRate?: number;

  @ApiProperty({
    enum: RecordingLayout,
    description: 'Layout used for the recording',
    required: false,
  })
  @IsOptional()
  @IsEnum(RecordingLayout)
  readonly recordingLayout?: RecordingLayout;

  @ApiProperty({
    description: 'Custom layout path for the recording',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly customLayout?: string;

  @ApiProperty({
    description: 'Shared memory size for the recording in bytes',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  readonly shmSize?: number;
}

export class StopRecordingDto {
  @ApiProperty({ description: 'ID of the recording to stop' })
  @IsString()
  readonly recordingId: string;
}
