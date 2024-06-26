import { Controller, Get, Param, Delete, Logger, Res, HttpException, HttpStatus, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { MeetingService } from '../service/meeting.service';
import { MeetingFindResponseDto } from '../dto/meeting.find.response.dto';
import { ConversationService } from 'components/conversation/service/conversation.service';
import { VertexService } from 'components/vertex/service/vertex.service';
import { EdgeService } from 'components/edge/service/edge.service';
import { RecordService } from '@openvidu/service/record.service';
import { RecordingResponseDto } from '@openvidu/dto/recording.response.dto';
import * as https from 'https'; // or 'http' depending on the protocol
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Meeting')
@Controller('api/meeting')
export class MeetingController {
  constructor(
    private readonly meetingService: MeetingService,
    private readonly conversationService: ConversationService,
    private readonly vertexService: VertexService,
    private readonly edgeService: EdgeService,
    private readonly recordService: RecordService
  ) {}

  private readonly logger = new Logger(MeetingController.name);

  @Get(':id')
  async getResult(@Param('id') id: string) {
    const meetingFindResponseDto: MeetingFindResponseDto = await this.meetingService.findOne(id);
    const conversations = await this.conversationService.findConversation(meetingFindResponseDto.conversationIds);
    const vertexes = await this.vertexService.findVertexes(meetingFindResponseDto.vertexIds);
    const edges = await this.edgeService.findEdges(meetingFindResponseDto.edgeIds);

    return { conversations, vertexes, edges };
  }

  @Get(':id/record')
  async getRecord(@Param('id') id: string, @Res() res: Response) {
    const meetingFindResponseDto: MeetingFindResponseDto = await this.meetingService.findOne(id);
    const recordingResponseDto: RecordingResponseDto = await this.recordService.getRecording(meetingFindResponseDto.record);

    if (!recordingResponseDto) {
      throw new NotFoundException('Recording not found');
    }

    switch (recordingResponseDto.status) {
      case 'ready':
        break;
      case 'started':
        throw new InternalServerErrorException('Recording is still in progress');
      case 'stopped':
        throw new InternalServerErrorException('Recording is stopped but not yet processed');
      case 'failed':
        throw new InternalServerErrorException('Recording failed');
      default:
        throw new InternalServerErrorException('Recording is not ready');
    }

    const fileUrl = recordingResponseDto.url;

    https.get(fileUrl, (fileRes) => {
      if (fileRes.statusCode !== 200) {
        throw new InternalServerErrorException('Failed to fetch the recording file');
      }
      res.setHeader('Content-Type', 'audio/webm'); 
      fileRes.pipe(res);
    }).on('error', (err) => {
      throw new InternalServerErrorException('Failed to fetch the recording file');
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetingService.remove(id);
  }
}
