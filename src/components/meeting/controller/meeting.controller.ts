import {
  Controller,
  Get,
  Param,
  Delete,
  Logger,
  Res,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { MeetingService } from '../service/meeting.service';
import { MeetingFindResponseDto } from '../dto/meeting.find.response.dto';
import { ConversationService } from 'components/conversation/service/conversation.service';
import { VertexService } from 'components/vertex/service/vertex.service';
import { EdgeService } from 'components/edge/service/edge.service';
import { RecordService } from '@openvidu/service/record.service';
import { RecordingResponseDto } from '@openvidu/dto/recording.response.dto';
import { MomResponseDto, ParticipantDto } from '@middleware/dto/mom.response.dto';
import { MiddlewareService } from '@middleware/service/middleware.service';
import * as https from 'https';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { MeetingListResponseDto } from '../dto/meeting.list.response.dto';
import { MeetingUpdateDto } from '../dto/meeting.update.dto';

@ApiTags('Meeting')
@Controller('api/meeting')
export class MeetingController {
  constructor(
    private readonly meetingService: MeetingService,
    private readonly conversationService: ConversationService,
    private readonly vertexService: VertexService,
    private readonly edgeService: EdgeService,
    private readonly recordService: RecordService,
    private readonly middlewareService: MiddlewareService,
  ) {}

  private readonly logger = new Logger(MeetingController.name);

  @Get(':id')
  @ApiOperation({ summary: 'Get meeting details' })
  @ApiParam({ name: 'id', description: 'ID of the meeting to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved meeting details',
    type: MeetingFindResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Meeting not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getResult(@Param('id') id: string) {
    const meetingFindResponseDto: MeetingFindResponseDto = await this.meetingService.findOne(id);
    const conversations = await this.conversationService.findConversation(meetingFindResponseDto.conversationIds);
    const vertexes = await this.vertexService.findVertexes(meetingFindResponseDto.vertexIds);
    const edges = await this.edgeService.findEdges(meetingFindResponseDto.edgeIds);

    return { conversations, vertexes, edges };
  }

  @Get(':id/mom')
  @ApiOperation({ summary: 'Get minutes of meeting using SSE' })
  @ApiParam({ name: 'id', description: 'ID of the meeting to retrieve minutes of' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved minutes of meeting',
  })
  @ApiResponse({ status: 404, description: 'Meeting not found' })
  async getMom(@Param('id') id: string, @Res() res: Response) {
    // Meeting 조회
    let meetingFindResponseDto: MeetingFindResponseDto = await this.meetingService.findOne(id);
    if (!meetingFindResponseDto) {
      throw new NotFoundException('Meeting not found');
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const intervalId = setInterval(async () => {
      meetingFindResponseDto = await this.meetingService.findOne(id); // mom id 조회될 때까지 검색
      if (meetingFindResponseDto.mom) {
        const momResponseDto = await this.meetingService.findMom(meetingFindResponseDto.mom);
        if (momResponseDto) {
          res.write(`data: ${JSON.stringify(momResponseDto)}\n\n`);

          // 인터벌을 정리하고 연결을 닫음
          clearInterval(intervalId);
          res.end();
        }
      }
    }, 2000);

    // 연결이 닫히면 인터벌을 정리
    res.on('close', () => {
      clearInterval(intervalId);
      res.end();
    });
  }

  @Get('owner/:ownerId')
  @ApiOperation({ summary: 'Get meetings by owner' })
  @ApiParam({ name: 'ownerId', description: 'ID of the owner to retrieve meetings for' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved meetings',
    type: [MeetingListResponseDto],
  })
  @ApiResponse({ status: 404, description: 'No meetings found for this owner' })
  async findAllByOwner(@Param('ownerId') ownerId: string): Promise<MeetingListResponseDto[]> {
    return this.meetingService.findAllByOwner(ownerId);
  }

  @Get(':id/record')
  @ApiOperation({ summary: 'Get meeting recording' })
  @ApiParam({ name: 'id', description: 'ID of the meeting to retrieve the recording for' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved meeting recording' })
  @ApiResponse({ status: 404, description: 'Recording not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getRecord(@Param('id') id: string, @Res() res: Response) {
    // Meeting 조회
    const meetingFindResponseDto: MeetingFindResponseDto = await this.meetingService.findOne(id);
    if (!meetingFindResponseDto) {
      throw new NotFoundException('Meeting not found');
    }

    const intervalId = setInterval(async () => {
      let recordingResponseDto: RecordingResponseDto = await this.recordService.getRecording(
        meetingFindResponseDto.record,
      );

      if (!recordingResponseDto) {
        throw new NotFoundException('Recording not found');
      }

      if (recordingResponseDto.status == 'ready' || recordingResponseDto.status == 'failed') {
        const fileUrl = recordingResponseDto.url;

        https
          .get(fileUrl, (fileRes) => {
            if (fileRes.statusCode !== 200) {
              throw new InternalServerErrorException('Failed to fetch the recording file');
            }
            res.setHeader('Content-Type', 'audio/webm');
            fileRes.pipe(res);
            clearInterval(intervalId);
          })
          .on('error', () => {
            throw new InternalServerErrorException('Failed to fetch the recording file');
          });
      }
    }, 2000);
  }

  @Post(':id/update')
  @ApiOperation({ summary: 'Update a specific field in a meeting' })
  @ApiParam({ name: 'id', description: 'Meeting ID' })
  @ApiBody({ type: MeetingUpdateDto })
  async updateField(@Param('id') id: string, @Body() body: MeetingUpdateDto) {
    body.id = id;
    return await this.meetingService.updateMeetingField(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete meeting' })
  @ApiParam({ name: 'id', description: 'ID of the meeting to delete' })
  @ApiResponse({ status: 200, description: 'Successfully deleted meeting' })
  @ApiResponse({ status: 404, description: 'Meeting not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  remove(@Param('id') id: string) {
    return this.meetingService.remove(id);
  }
}
