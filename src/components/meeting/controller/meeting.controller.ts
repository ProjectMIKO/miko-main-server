import { Controller, Get, Param, Delete, Logger } from '@nestjs/common';
import { MeetingService } from '../service/meeting.service';
import { MeetingFindResponseDto } from '../dto/meeting.find.response.dto';
import { ConversationService } from 'components/conversation/service/conversation.service';
import { VertexService } from 'components/vertex/service/vertex.service';
import { EdgeService } from 'components/edge/service/edge.service';

@Controller('meeting')
export class MeetingController {
  constructor(
    private readonly meetingService: MeetingService,
    private readonly conversationService: ConversationService,
    private readonly vertexService: VertexService,
    private readonly edgeService: EdgeService,
  ) {}

  private readonly logger = new Logger(MeetingController.name);

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.meetingService.findOne(id);
  // }

  @Get('id')
  async getResult(@Param('id') id: string) {
    this.logger.log('Join Room Method: Initiated');

    const meetingFindResponseDto: MeetingFindResponseDto = await this.meetingService.findOne(id);
    const conversations = await this.conversationService.findConversation(meetingFindResponseDto.conversationIds);
    const vertexes = await this.vertexService.findVertexes(meetingFindResponseDto.vertexIds);
    const edges = await this.edgeService.findEdges(meetingFindResponseDto.edgeIds);

    return { conversations, vertexes, edges };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetingService.remove(id);
  }
}
