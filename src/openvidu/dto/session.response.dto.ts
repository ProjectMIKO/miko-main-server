import { SessionPropertiesDto } from './session.request.dto';
import { ConnectionResponseDto } from './connection.response.dto';

export class SessionResponseDto {
  readonly sessionId: string;
  readonly createdAt: number;
  readonly properties: SessionPropertiesDto;
  readonly connections: ConnectionResponseDto[];
  readonly activeConnections: ConnectionResponseDto[];
  readonly recording: boolean;
  readonly broadcasting: boolean;
}