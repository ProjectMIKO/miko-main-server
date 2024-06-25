import { IsString, IsBoolean, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Recording, RecordingLayout } from 'openvidu-node-client';

export class RecordingResponseDto {
  @ApiProperty({ description: 'Unique identifier for the recording' })
  @IsString()
  readonly id: string;

  @ApiProperty({ description: 'Name of the recording' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Indicates if the recording has audio' })
  @IsBoolean()
  readonly hasAudio: boolean;

  @ApiProperty({ description: 'Indicates if the recording has video' })
  @IsBoolean()
  readonly hasVideo: boolean;

  @ApiProperty({
    enum: Recording.OutputMode,
    description: 'Output mode of the recording',
  })
  @IsEnum(Recording.OutputMode)
  readonly outputMode: Recording.OutputMode;

  @ApiProperty({ description: 'Resolution of the recording' })
  @IsString()
  readonly resolution: string;

  @ApiProperty({ description: 'Frame rate of the recording' })
  @IsNumber()
  readonly frameRate: number;

  @ApiProperty({ description: 'URL to access the recording' })
  @IsString()
  readonly url: string;
  
  @ApiProperty({
    enum: RecordingLayout,
    description: 'Layout used for the recording',
  })
  @IsEnum(RecordingLayout)
  readonly recordingLayout: RecordingLayout;

  @ApiProperty({ description: 'Custom layout path for the recording' })
  @IsString()
  readonly customLayout: string;

  @ApiProperty({ description: 'Shared memory size for the recording in bytes' })
  @IsString()
  readonly shmSize: string;
}