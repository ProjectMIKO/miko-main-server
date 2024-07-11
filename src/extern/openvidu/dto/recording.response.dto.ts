import { IsString, IsBoolean, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Recording, RecordingLayout } from 'openvidu-node-client';

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

  @ApiProperty({ description: 'Session identifier for the recording' })
  @IsString()
  readonly sessionId: string;

  @ApiProperty({ description: 'Timestamp when the recording was created' })
  @IsNumber()
  readonly createdAt: number;

  @ApiProperty({ description: 'URL to access the recording' })
  @IsString()
  readonly url: string | null;

  @ApiProperty({ description: 'Status of the recording' })
  @IsString()
  readonly status: string;

  @ApiProperty({ description: 'Properties of the recording' })
  readonly properties: RecordingPropertiesDto;

  constructor(status: string) {
    this.status = status;
  }
}
