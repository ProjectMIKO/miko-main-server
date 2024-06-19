import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenVidu, Session, Connection } from 'openvidu-node-client';
import { SessionPropertiesDto } from '../dto/session.request.dto';
import { ConnectionPropertiesDto } from '../dto/connection.request.dto';
import { SessionResponseDto } from '../dto/session.response.dto';
import { ConnectionResponseDto } from '../dto/connection.response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class OpenviduService implements OnModuleInit {
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

  async createSession(properties?: SessionPropertiesDto): Promise<SessionResponseDto> {
    const session: Session = await this.openvidu.createSession(properties);
    return this.toSessionResponseDto(session);
  }

  private toSessionResponseDto(session: Session): SessionResponseDto {
    const { sessionId, createdAt, connections, activeConnections, recording, broadcasting } = session;
    const connectionDtos = connections.map(conn => this.toConnectionResponseDto(conn));
    const activeConnectionDtos = activeConnections.map(conn => this.toConnectionResponseDto(conn));
    return plainToClass(SessionResponseDto, {
      sessionId,
      createdAt,
      connections: connectionDtos,
      activeConnections: activeConnectionDtos,
      recording,
      broadcasting
    });
  }

  async createConnection(
    sessionId: string,
    properties?: ConnectionPropertiesDto,
  ): Promise<ConnectionResponseDto> {
    const session = this.openvidu.activeSessions.find(
      (s) => s.sessionId === sessionId,
    );
    if (!session) {
      throw new Error('Session not found');
    }
    const connection: Connection = await session.createConnection(properties);
    return this.toConnectionResponseDto(connection);
  }

  private toConnectionResponseDto(connection: Connection): ConnectionResponseDto {
    const { connectionId, status, createdAt, activeAt, location, ip, platform, clientData, token, publishers, subscribers, connectionProperties } = connection;
    return plainToClass(ConnectionResponseDto, {
      id: connectionId,
      status,
      createdAt,
      activeAt,
      location,
      ip,
      platform,
      clientData,
      token,
      record: connectionProperties.record,
      publishers: publishers.map(p => ({
        streamId: p.streamId,
        createdAt: p.createdAt,
        hasAudio: p.hasAudio,
        hasVideo: p.hasVideo,
        audioActive: p.audioActive,
        videoActive: p.videoActive,
        frameRate: p.frameRate,
        typeOfVideo: p.typeOfVideo,
        videoDimensions: p.videoDimensions
      })),
      subscribers
    });
  }
}
