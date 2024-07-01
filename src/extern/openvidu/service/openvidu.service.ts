import { Injectable, OnModuleInit, NotFoundException, ForbiddenException } from '@nestjs/common';
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
    const OPENVIDU_URL = this.configService.get<string>('OPENVIDU_URL', 'http://localhost:4443');
    const OPENVIDU_SECRET = this.configService.get<string>('OPENVIDU_SECRET', 'MY_SECRET');
    this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
  }

  async createSession(properties?: SessionPropertiesDto): Promise<SessionResponseDto> {
    const session: Session = await this.openvidu.createSession(properties);
    return this.toSessionResponseDto(session);
  }

  private toSessionResponseDto(session: Session): SessionResponseDto {
    const { sessionId, createdAt, connections, activeConnections, recording, broadcasting } = session;
    const connectionDtos = connections.map((conn) => this.toConnectionResponseDto(conn));
    const activeConnectionDtos = activeConnections.map((conn) => this.toConnectionResponseDto(conn));
    return plainToClass(SessionResponseDto, {
      sessionId,
      createdAt,
      connections: connectionDtos,
      activeConnections: activeConnectionDtos,
      recording,
      broadcasting,
    });
  }

  async createConnection(sessionId: string, properties?: ConnectionPropertiesDto): Promise<ConnectionResponseDto> {
    const session = this.openvidu.activeSessions.find((s) => s.sessionId === sessionId);
    if (!session) {
      throw new Error('Session not found');
    }
    const connection: Connection = await session.createConnection(properties);
    return this.toConnectionResponseDto(connection);
  }

  private toConnectionResponseDto(connection: Connection): ConnectionResponseDto {
    const {
      connectionId,
      status,
      createdAt,
      activeAt,
      location,
      ip,
      platform,
      clientData,
      connectionProperties,
      token,
      // publishers,
      subscribers,
    } = connection;
    return plainToClass(ConnectionResponseDto, {
      connectionId,
      status,
      createdAt,
      activeAt,
      location,
      ip,
      platform,
      clientData,
      connectionProperties,
      token,
      // publishers,
      subscribers,
    });
  }

  async fetchAllSessions(): Promise<SessionResponseDto[]> {
    // Fetch all session info from OpenVidu Server
    await this.openvidu.fetch();
    const sessions: Session[] = this.openvidu.activeSessions;
    const sessionResponseDtoArr = sessions.map((session) => this.toSessionResponseDto(session));
    return sessionResponseDtoArr;
  }

  async fetchSession(sessionId: string): Promise<SessionResponseDto> {
    // Fetch the session info from OpenVidu Server
    await this.openvidu.fetch();
    const session: Session = this.openvidu.activeSessions.find((s) => s.sessionId === sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }
    return this.toSessionResponseDto(session);
  }

  async closeSession(sessionId: string): Promise<void> {
    // Fetch the session info from OpenVidu Server
    await this.openvidu.fetch();
    const session: Session = this.openvidu.activeSessions.find((s) => s.sessionId === sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    // Verify user authorization by checking the token
    // const authorized = this.checkUserAuthorization(token, session);
    // if (!authorized) {
    //   throw new ForbiddenException('User not authorized to close this session');
    // }

    // Close the session
    await session.close();
  }

  private checkUserAuthorization(token: string, session: Session): boolean {
    // Check if the token matches any of the active connections' tokens in the session
    return session.activeConnections.some(
      // activeConnections 대신 connections 사용해도 됨
      (connection) => {
        return connection.token === token && connection.connectionProperties.role === 'MODERATOR';
      },
    );
  }

  async destroyConnection(sessionId: string, connectionId: string, token: string): Promise<void> {
    // Fetch the session info from OpenVidu Server
    await this.openvidu.fetch();
    const session: Session = this.openvidu.activeSessions.find((s) => s.sessionId === sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    // Verify user authorization by checking the token and role
    const authorized = this.checkUserAuthorization(token, session);
    if (!authorized) {
      throw new ForbiddenException('User not authorized to destroy this connection');
    }

    const connection = session.connections.find((conn) => conn.connectionId === connectionId);
    if (!connection) {
      throw new NotFoundException('Connection not found');
    }

    // Destroy the connection
    await session.forceDisconnect(connection);
  }

  async unpublishStream(sessionId: string, connectionId: string, token: string): Promise<void> {
    // Fetch the session info from OpenVidu Server
    await this.openvidu.fetch();
    const session: Session = this.openvidu.activeSessions.find((s) => s.sessionId === sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    // Verify user authorization by checking the token and role
    const authorized = this.checkUserAuthorization(token, session);
    if (!authorized) {
      throw new ForbiddenException('User not authorized to unpublish this stream');
    }

    const connection = session.connections.find((conn) => conn.connectionId === connectionId);
    if (!connection) {
      throw new NotFoundException('Connection not found');
    }

    const publisher = connection.publishers.find((pub) => pub.streamId);
    if (!publisher) {
      throw new NotFoundException('Publisher not found');
    }

    // Unpublish the stream
    await session.forceUnpublish(publisher);
  }
}
