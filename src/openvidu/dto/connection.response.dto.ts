import { ApiProperty } from '@nestjs/swagger';
import { ConnectionPropertiesDto } from './connection.request.dto';
import { PublisherResponseDto } from './publisher.response.dto';

export class ConnectionResponseDto {
  @ApiProperty({ description: 'ID of the connection' })
  readonly connectionId: string;

  @ApiProperty({ description: 'Status of the connection' })
  readonly status: string;

  @ApiProperty({ description: 'Timestamp when the connection was created' })
  readonly createdAt: number;

  @ApiProperty({ description: 'Timestamp when the connection became active' })
  readonly activeAt: number;

  @ApiProperty({ description: 'Location of the connection' })
  readonly location: string;

  @ApiProperty({ description: 'IP address of the connection' })
  readonly ip: string;

  @ApiProperty({ description: 'Platform of the connection' })
  readonly platform: string;

  @ApiProperty({ description: 'Client data associated with the connection' })
  readonly clientData: string;

  @ApiProperty({
    description: 'Properties of the connection',
    type: ConnectionPropertiesDto,
  })
  readonly connectionProperties: ConnectionPropertiesDto;

  @ApiProperty({ description: 'Token for the connection' })
  readonly token: string;

  @ApiProperty({
    description: 'List of publishers in the connection',
    type: [PublisherResponseDto],
  })
  readonly publishers: PublisherResponseDto[];

  @ApiProperty({
    description: 'List of subscribers in the connection',
    isArray: true,
  })
  readonly subscribers: string[];
}
