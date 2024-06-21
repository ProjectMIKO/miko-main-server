import {
  Controller,
  Post,
  Body,
  Param,
  NotFoundException,
  Get,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { OpenviduService } from '../service/openvidu.service';
import { RecordService } from '../service/record.service';
import { SessionPropertiesDto } from '../dto/session.request.dto';
import { ConnectionPropertiesDto } from '../dto/connection.request.dto';
import { ConnectionResponseDto } from '../dto/connection.response.dto';
import { SessionResponseDto } from '../dto/session.response.dto';
import { ModeratorRequestDto } from '../dto/moderator.request.dto';
import {
  StartRecordingDto,
  StopRecordingDto,
} from '../dto/recording.request.dto';
import { RecordingResponseDto } from '../dto/recording.response.dto';

@ApiTags('OpenVidu')
@Controller('api/openvidu')
export class OpenviduController {
  constructor(
    private readonly openviduService: OpenviduService,
    private readonly recordService: RecordService,
  ) {}

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
    const sessionResponseDtoArr: SessionResponseDto[] =
      await this.openviduService.fetchAllSessions();
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
      const sessionResponseDto =
        await this.openviduService.fetchSession(sessionId);
      return sessionResponseDto;
    } catch (error) {
      throw new NotFoundException('Session not found');
    }
  }

  @Post('sessions/:sessionId/close')
  @ApiOperation({ summary: 'Close a specific session (admin only)' })
  @ApiResponse({
    status: 204,
    description: 'Session closed successfully',
  })
  @ApiResponse({ status: 404, description: 'Session not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'sessionId', description: 'The ID of the session' })
  @ApiBody({ type: ModeratorRequestDto })
  async closeSession(
    @Param('sessionId') sessionId: string,
    @Body() moderatorRequestDto: ModeratorRequestDto,
  ): Promise<void> {
    try {
      await this.openviduService.closeSession(
        sessionId,
        moderatorRequestDto.token,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Session not found');
      } else if (error instanceof ForbiddenException) {
        throw new ForbiddenException(
          'User not authorized to close this session',
        );
      } else {
        throw error;
      }
    }
  }

  @Post('sessions/:sessionId/connections/:connectionId/destroy')
  @ApiOperation({ summary: 'Destroy a specific connection (admin only)' })
  @ApiResponse({
    status: 204,
    description: 'Connection destroyed successfully',
  })
  @ApiResponse({ status: 404, description: 'Session or connection not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'sessionId', description: 'The ID of the session' })
  @ApiParam({ name: 'connectionId', description: 'The ID of the connection' })
  @ApiBody({ type: ModeratorRequestDto })
  async destroyConnection(
    @Param('sessionId') sessionId: string,
    @Param('connectionId') connectionId: string,
    @Body() moderatorRequestDto: ModeratorRequestDto,
  ): Promise<void> {
    try {
      await this.openviduService.destroyConnection(
        sessionId,
        connectionId,
        moderatorRequestDto.token,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Session or connection not found');
      } else if (error instanceof ForbiddenException) {
        throw new ForbiddenException(
          'User not authorized to destroy this connection',
        );
      } else {
        throw error;
      }
    }
  }

  @Post('sessions/:sessionId/connections/:connectionId/unpublish')
  @ApiOperation({ summary: 'Unpublish a specific stream (admin only)' })
  @ApiResponse({
    status: 204,
    description: 'Stream unpublished successfully',
  })
  @ApiResponse({ status: 404, description: 'Session or connection not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'sessionId', description: 'The ID of the session' })
  @ApiParam({ name: 'connectionId', description: 'The ID of the connection' })
  @ApiBody({ type: ModeratorRequestDto })
  async unpublishStream(
    @Param('sessionId') sessionId: string,
    @Param('connectionId') connectionId: string,
    @Body() moderatorRequestDto: ModeratorRequestDto,
  ): Promise<void> {
    try {
      await this.openviduService.unpublishStream(
        sessionId,
        connectionId,
        moderatorRequestDto.token,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Session or connection not found');
      } else if (error instanceof ForbiddenException) {
        throw new ForbiddenException(
          'User not authorized to unpublish this stream',
        );
      } else {
        throw error;
      }
    }
  }

  @Post('recordings/start')
  @ApiOperation({ summary: 'Start a recording' })
  @ApiResponse({
    status: 201,
    description: 'Recording started successfully',
    type: RecordingResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Session not found' })
  @ApiBody({ type: StartRecordingDto })
  async startRecording(
    @Body() startRecordingDto: StartRecordingDto,
  ): Promise<RecordingResponseDto> {
    const recordingResponseDto =
      await this.recordService.startRecording(startRecordingDto);
    return recordingResponseDto;
  }

  @Post('recordings/stop')
  @ApiOperation({ summary: 'Stop a recording' })
  @ApiResponse({
    status: 200,
    description: 'Recording stopped successfully',
    type: RecordingResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Recording not found' })
  @ApiBody({ type: StopRecordingDto })
  async stopRecording(
    @Body() stopRecordingDto: StopRecordingDto,
  ): Promise<RecordingResponseDto> {
    const recordingResponseDto = await this.recordService.stopRecording(
      stopRecordingDto.recordingId,
    );
    return recordingResponseDto;
  }

  @Get('recordings/:recordingId')
  @ApiOperation({ summary: 'Get a recording' })
  @ApiResponse({
    status: 200,
    description: 'Recording retrieved successfully',
    type: RecordingResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Recording not found' })
  @ApiParam({ name: 'recordingId', description: 'The ID of the recording' })
  async getRecording(
    @Param('recordingId') recordingId: string,
  ): Promise<RecordingResponseDto> {
    try {
      const recordingResponseDto =
        await this.recordService.getRecording(recordingId);
      return recordingResponseDto;
    } catch (error) {
      throw new NotFoundException('Recording not found');
    }
  }
}
