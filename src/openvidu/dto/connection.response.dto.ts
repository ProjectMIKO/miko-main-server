import { ConnectionPropertiesDto } from './connection.request.dto'
import { PublisherResponseDto } from './publisher.response.dto';

export class ConnectionResponseDto {
    readonly connectionId: string;
    readonly status: string;
    readonly createdAt: number;
    readonly activeAt: number;
    readonly location: string;
    readonly ip: string;
    readonly platform: string;
    readonly clientData: string;
    readonly connectionProperties: ConnectionPropertiesDto;
    readonly token: string;
    readonly publishers: PublisherResponseDto[];
    readonly subscribers: string[];
}