import {
  Controller,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { OpenviduService } from '../service/openvidu.service';
import { SessionPropertiesDto } from '../dto/session.request.dto';
import { ConnectionPropertiesDto } from '../dto/connection.request.dto';

@Controller('api/openvidu')
export class OpenviduController {
  constructor(private readonly openviduService: OpenviduService) {}

  @Post('sessions')
  async createSession(@Body() body: SessionPropertiesDto) {
    const SessionResponseDto = await this.openviduService.createSession(body);
    return SessionResponseDto
  }

  @Post('sessions/:sessionId/connections')
  async createConnection(
    @Param('sessionId') sessionId: string,
    @Body() body: ConnectionPropertiesDto,
  ) {
    try {
      const ConnectionResponseDto = await this.openviduService.createConnection(
        sessionId,
        body,
      );
      return { ConnectionResponseDto };
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
