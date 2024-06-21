import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OpenVidu,
  Recording,
  RecordingProperties,
  Session,
} from 'openvidu-node-client';
import { StartRecordingDto } from '../dto/recording.request.dto';
import { RecordingResponseDto } from '../dto/recording.response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RecordService {
  private openvidu: OpenVidu;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const OPENVIDU_URL = this.configService.get<string>(
      'OPENVIDU_URL',
      'http://localhost:4443',
    );
    const OPENVIDU_SECRET = this.configService.get<string>(
      'OPENVIDU_SECRET',
      'MY_SECRET',
    );
    this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
  }

  async startRecording(
    startRecordingDto: StartRecordingDto,
  ): Promise<RecordingResponseDto> {
    const {
      sessionId,
      name,
      hasAudio,
      hasVideo,
      outputMode,
      resolution,
      frameRate,
      recordingLayout,
      customLayout,
      shmSize,
    } = startRecordingDto;

    // Fetch the session info from OpenVidu Server
    await this.openvidu.fetch();
    const session: Session = this.openvidu.activeSessions.find(
      (s) => s.sessionId === sessionId,
    );
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    // Define recording properties
    const recordingProperties: RecordingProperties = {
      name,
      hasAudio,
      hasVideo,
      outputMode,
      recordingLayout,
      resolution,
      frameRate,
      shmSize,
      customLayout,
    };

    // Start recording
    const recording = await this.openvidu.startRecording(
      sessionId,
      recordingProperties,
    );

    return plainToClass(RecordingResponseDto, recording);
  }

  async stopRecording(recordingId: string): Promise<RecordingResponseDto> {
    // Stop recording
    const recording = await this.openvidu.stopRecording(recordingId);
    return plainToClass(RecordingResponseDto, recording);
  }
}
