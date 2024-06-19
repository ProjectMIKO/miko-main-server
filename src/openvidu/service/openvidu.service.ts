import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenVidu, Session, Connection } from 'openvidu-node-client';

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

  async createSession(properties?: any): Promise<Session> {
    return this.openvidu.createSession(properties);
  }

  async createConnection(
    sessionId: string,
    properties?: any,
  ): Promise<Connection> {
    const session = this.openvidu.activeSessions.find(
      (s) => s.sessionId === sessionId,
    );
    if (!session) {
      throw new Error('Session not found');
    }
    return session.createConnection(properties);
  }
}
