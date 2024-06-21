import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum ConnectionType {
  WEBRTC = 'WEBRTC',
  IPCAM = 'IPCAM',
}

export enum OpenViduRole {
  SUBSCRIBER = 'SUBSCRIBER',
  PUBLISHER = 'PUBLISHER',
  MODERATOR = 'MODERATOR',
}

export class IceServerPropertiesDto {
  @ApiProperty({ description: 'URL of the ICE server' })
  @IsString()
  readonly url: string;

  @ApiPropertyOptional({
    description: 'Static authentication secret for the ICE server',
  })
  @IsOptional()
  @IsString()
  readonly staticAuthSecret?: string;

  @ApiPropertyOptional({ description: 'Username for the ICE server' })
  @IsOptional()
  @IsString()
  readonly username?: string;

  @ApiPropertyOptional({ description: 'Credential for the ICE server' })
  @IsOptional()
  @IsString()
  readonly credential?: string;
}

export class KurentoOptionsDto {
  @ApiPropertyOptional({ description: 'Maximum receiving bandwidth for video' })
  @IsOptional()
  @IsNumber()
  readonly videoMaxRecvBandwidth?: number;

  @ApiPropertyOptional({ description: 'Minimum receiving bandwidth for video' })
  @IsOptional()
  @IsNumber()
  readonly videoMinRecvBandwidth?: number;

  @ApiPropertyOptional({ description: 'Maximum sending bandwidth for video' })
  @IsOptional()
  @IsNumber()
  readonly videoMaxSendBandwidth?: number;

  @ApiPropertyOptional({ description: 'Minimum sending bandwidth for video' })
  @IsOptional()
  @IsNumber()
  readonly videoMinSendBandwidth?: number;

  @ApiPropertyOptional({
    description: 'Allowed filters for video streams',
    isArray: true,
  })
  @IsOptional()
  @IsString({ each: true })
  readonly allowedFilters?: string[];
}

export class ConnectionPropertiesDto {
  @ApiPropertyOptional({
    description: 'Type of connection',
    enum: ConnectionType,
  })
  @IsOptional()
  @IsEnum(ConnectionType)
  readonly type?: ConnectionType;

  @ApiPropertyOptional({ description: 'Additional data for the connection' })
  @IsOptional()
  @IsString()
  readonly data?: string;

  @ApiPropertyOptional({
    description: 'Whether the connection should be recorded',
  })
  @IsOptional()
  @IsBoolean()
  readonly record?: boolean;

  @ApiPropertyOptional({
    description: 'Role of the user in the session',
    enum: OpenViduRole,
  })
  @IsOptional()
  @IsEnum(OpenViduRole)
  readonly role?: OpenViduRole;

  @ApiPropertyOptional({
    description: 'Kurento options for the connection',
    type: KurentoOptionsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => KurentoOptionsDto)
  readonly kurentoOptions?: KurentoOptionsDto;

  @ApiPropertyOptional({ description: 'RTSP URI for the connection' })
  @IsOptional()
  @IsString()
  readonly rtspUri?: string;

  @ApiPropertyOptional({ description: 'Whether to use adaptive bitrate' })
  @IsOptional()
  @IsBoolean()
  readonly adaptativeBitrate?: boolean;

  @ApiPropertyOptional({ description: 'Only play with subscribers' })
  @IsOptional()
  @IsBoolean()
  readonly onlyPlayWithSubscribers?: boolean;

  @ApiPropertyOptional({ description: 'Network cache size' })
  @IsOptional()
  @IsNumber()
  readonly networkCache?: number;

  @ApiPropertyOptional({
    description: 'Custom ICE servers',
    type: [IceServerPropertiesDto],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => IceServerPropertiesDto)
  readonly customIceServers?: IceServerPropertiesDto[];
}
