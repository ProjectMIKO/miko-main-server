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
  @IsString()
  readonly url: string;

  @IsOptional()
  @IsString()
  readonly staticAuthSecret?: string;

  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsString()
  readonly credential?: string;
}

class KurentoOptionsDto {
  @IsOptional()
  @IsNumber()
  readonly videoMaxRecvBandwidth?: number;

  @IsOptional()
  @IsNumber()
  readonly videoMinRecvBandwidth?: number;

  @IsOptional()
  @IsNumber()
  readonly videoMaxSendBandwidth?: number;

  @IsOptional()
  @IsNumber()
  readonly videoMinSendBandwidth?: number;

  @IsOptional()
  @IsString({ each: true })
  readonly allowedFilters?: string[];
}

export class ConnectionPropertiesDto {
  @IsOptional()
  @IsEnum(ConnectionType)
  readonly type?: ConnectionType;

  @IsOptional()
  @IsString()
  readonly data?: string;

  @IsOptional()
  @IsBoolean()
  readonly record?: boolean;

  @IsOptional()
  @IsEnum(OpenViduRole)
  readonly role?: OpenViduRole;

  @IsOptional()
  @ValidateNested()
  @Type(() => KurentoOptionsDto)
  readonly kurentoOptions?: KurentoOptionsDto;

  @IsOptional()
  @IsString()
  readonly rtspUri?: string;

  @IsOptional()
  @IsBoolean()
  readonly adaptativeBitrate?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly onlyPlayWithSubscribers?: boolean;

  @IsOptional()
  @IsNumber()
  readonly networkCache?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => IceServerPropertiesDto)
  readonly customIceServers?: IceServerPropertiesDto[];
}
