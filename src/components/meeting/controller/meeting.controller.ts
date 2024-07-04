import {
  Controller,
  Get,
  Param,
  Delete,
  Logger,
  Res,
  InternalServerErrorException,
  NotFoundException
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
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get minutes of meeting' })
  @ApiParam({ name: 'id', description: 'ID of the meeting to retrieve minutes of' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved minutes of meeting',
    type: MomResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Meeting not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getMom(@Param('id') id: string) {
    // Meeting 조회
    const meetingFindResponseDto: MeetingFindResponseDto = await this.meetingService.findOne(id);
    if (!meetingFindResponseDto) {
      throw new NotFoundException('Meeting not found');
    }
  
    // Conversations 및 Vertexes 조회
    const conversations = await this.conversationService.findConversation(meetingFindResponseDto.conversationIds);
    const vertexes = await this.vertexService.findVertexes(meetingFindResponseDto.vertexIds);
  
    // 회의록 추출
    const momResponseDto: MomResponseDto = await this.middlewareService.extractMom(conversations, vertexes);
    momResponseDto.title = meetingFindResponseDto.title;
    momResponseDto.startTime = meetingFindResponseDto.startTime;
  
    // 회의 기간 계산
    const periodMillis = meetingFindResponseDto.endTime.getTime() - meetingFindResponseDto.startTime.getTime();
    momResponseDto.period = periodMillis;
  
    // 참석자 목록 설정
    const participants: ParticipantDto[] = meetingFindResponseDto.owner.map((name, index) => ({
      name,
      role: index === 0 ? 'host' : 'member',
    }));
    momResponseDto.participants = participants;
  
    // Mom 저장
    const mom = await this.meetingService.createMom(momResponseDto);
  
    // Meeting에 Mom ID 업데이트
    const meetingUpdateDto_mom: MeetingUpdateDto = {
      id: id,
      value: mom._id.toString(),
      field: 'mom',
      action: '$set',
    };
    await this.meetingService.updateMeetingField(meetingUpdateDto_mom);
  
    return { momResponseDto };
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
    const meetingFindResponseDto: MeetingFindResponseDto = await this.meetingService.findOne(id);
    const recordingResponseDto: RecordingResponseDto = await this.recordService.getRecording(
      meetingFindResponseDto.record,
    );

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
      // case 'failed':
      //   throw new InternalServerErrorException('Recording failed');
      // default:
      //   throw new InternalServerErrorException('Recording is not ready');
    }

    const fileUrl = recordingResponseDto.url;

    https
      .get(fileUrl, (fileRes) => {
        if (fileRes.statusCode !== 200) {
          throw new InternalServerErrorException('Failed to fetch the recording file');
        }
        res.setHeader('Content-Type', 'audio/webm');
        fileRes.pipe(res);
      })
      .on('error', () => {
        throw new InternalServerErrorException('Failed to fetch the recording file');
      });
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
