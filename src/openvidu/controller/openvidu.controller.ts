import {
  Controller,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { OpenviduService } from '../service/openvidu.service';

@Controller('api/sessions')
export class OpenviduController {
  constructor(private readonly openviduService: OpenviduService) {}

  @Post()
  async createSession(@Body() body: any) {
    const session = await this.openviduService.createSession(body);
    return { sessionId: session.sessionId };
  }

  @Post(':sessionId/connections')
  async createConnection(
    @Param('sessionId') sessionId: string,
    @Body() body: any,
  ) {
    try {
      const connection = await this.openviduService.createConnection(
        sessionId,
        body,
      );
      return { token: connection.token };
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
