import {
  Controller,
  Post,
  Body,
  Param,
  NotFoundException,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { OpenviduService } from '../service/openvidu.service';
import { SessionPropertiesDto } from '../dto/session.request.dto';
import { ConnectionPropertiesDto } from '../dto/connection.request.dto';
import { ConnectionResponseDto } from '../dto/connection.response.dto';
import { SessionResponseDto } from '../dto/session.response.dto';

@ApiTags('OpenVidu')
@Controller('api/openvidu')
export class OpenviduController {
  constructor(private readonly openviduService: OpenviduService) {}

  @Post('sessions')
  @ApiOperation({ summary: 'Create a new session' })
  @ApiResponse({
    status: 201,
    description: 'Session created successfully',
    type: SessionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: SessionPropertiesDto })
  async createSession(
    @Body() body: SessionPropertiesDto,
  ): Promise<SessionResponseDto> {
    const sessionResponseDto = await this.openviduService.createSession(body);
    return sessionResponseDto;
  }

  @Post('sessions/:sessionId/connections')
  @ApiOperation({ summary: 'Create a new connection for a session' })
  @ApiResponse({
    status: 201,
    description: 'Connection created successfully',
    type: ConnectionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Session not found' })
  @ApiParam({ name: 'sessionId', description: 'The ID of the session' })
  @ApiBody({ type: ConnectionPropertiesDto })
  async createConnection(
    @Param('sessionId') sessionId: string,
    @Body() body: ConnectionPropertiesDto,
  ): Promise<ConnectionResponseDto> {
    try {
      const connectionResponseDto = await this.openviduService.createConnection(
        sessionId,
        body,
      );
      return connectionResponseDto;
    } catch (error) {
      throw new NotFoundException('Session not found');
    }
  }

  @Get('sessions')
  @ApiOperation({ summary: 'Retrieve all sessions' })
  @ApiResponse({
    status: 200,
    description: 'Sessions retrieved successfully',
    type: [SessionResponseDto],
  })
  async fetchAllSessions(): Promise<SessionResponseDto[]> {
    const sessionResponseDtoArr: SessionResponseDto[] = await this.openviduService.fetchAllSessions();
    return sessionResponseDtoArr;
  }

  @Get('sessions/:sessionId')
  @ApiOperation({ summary: 'Retrieve a specific session' })
  @ApiResponse({
    status: 200,
    description: 'Session retrieved successfully',
    type: SessionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Session not found' })
  @ApiParam({ name: 'sessionId', description: 'The ID of the session' })
  async fetchSession(
    @Param('sessionId') sessionId: string,
  ): Promise<SessionResponseDto> {
    try {
      const sessionResponseDto = await this.openviduService.fetchSession(sessionId);
      return sessionResponseDto;
    } catch (error) {
      throw new NotFoundException('Session not found');
    }
  }
}
