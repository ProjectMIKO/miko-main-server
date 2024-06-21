import { ApiProperty } from '@nestjs/swagger';
import { SessionPropertiesDto } from './session.request.dto';
import { ConnectionResponseDto } from './connection.response.dto';

export class SessionResponseDto {
  @ApiProperty({ description: 'ID of the session' })
  readonly sessionId: string;

  @ApiProperty({ description: 'Timestamp when the session was created' })
  readonly createdAt: number;

  @ApiProperty({
    description: 'Properties of the session',
    type: SessionPropertiesDto,
  })
  readonly properties: SessionPropertiesDto;

  @ApiProperty({
    description: 'Connections of the session',
    type: [ConnectionResponseDto],
  })
  readonly connections: ConnectionResponseDto[];

  @ApiProperty({
    description: 'Active connections of the session',
    type: [ConnectionResponseDto],
  })
  readonly activeConnections: ConnectionResponseDto[];

  @ApiProperty({ description: 'Indicates if the session is being recorded' })
  readonly recording: boolean;

  @ApiProperty({ description: 'Indicates if the session is broadcasting' })
  readonly broadcasting: boolean;
}
