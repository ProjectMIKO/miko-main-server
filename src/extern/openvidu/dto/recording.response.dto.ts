import { IsString, IsBoolean, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Recording } from 'openvidu-node-client';

export class RecordingResponseDto {
  @ApiProperty({ description: 'Size of the recording in bytes' })
  @IsNumber()
  readonly size: number;

  @ApiProperty({ description: 'Duration of the recording in seconds' })
  @IsNumber()
  readonly duration: number;

  @ApiProperty({ description: 'Unique identifier for the recording' })
  @IsString()
  readonly id: string;

  @ApiProperty({ description: 'Session ID associated with the recording' })
  @IsString()
  readonly sessionId: string;

  @ApiProperty({ description: 'Timestamp of when the recording was created' })
  @IsNumber()
  readonly createdAt: number;

  @ApiProperty({ description: 'URL to access the recording' })
  @IsString()
  readonly url: string;

  @ApiProperty({ description: 'Status of the recording' })
  @IsString()
  readonly status: string;

  @ApiProperty({ description: 'Properties of the recording' })
  readonly properties: RecordingPropertiesDto;
}

export class RecordingPropertiesDto {
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
}
