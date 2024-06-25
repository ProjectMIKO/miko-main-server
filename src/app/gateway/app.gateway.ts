import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { MeetingService } from '@meeting/service/meeting.service';
import { MiddlewareService } from '@middleware/service/middleware.service';
import { MeetingCreateDto } from '@meeting/dto/meeting.create.dto';
import { VertexCreateDto } from '@vertex/dto/vertex.create.dto';
import { SummarizeRequestDto } from '@middleware/dto/summarize.request.dto';
import { ConvertResponseDto } from '@middleware/dto/convert.response.dto';
import { SummarizeResponseDto } from '@middleware/dto/summarize.response.dto';
import { RoomConversations } from '@meeting/interface/roomConversation.interface';
import { ConversationCreateDto } from '@conversation/dto/conversation.create.dto';
import { ConversationService } from '@conversation/service/conversation.service';
import { VertexService } from '@vertex/service/vertex.service';
import { EdgeService } from '@edge/service/edge.service';
import { EmptyDataWarning } from '@global/warning/emptyData.warning';
import { EdgeRequestDto } from '@edge/dto/edge.request.dto';
import { RecordService } from '@openvidu/service/record.service';
import { StartRecordingDto } from '@openvidu/dto/recording.request.dto';
import { S3Service } from '@s3/service/s3.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello MIKO!';
  }
}

@WebSocketGateway({
  cors: {
    origin: ['https://admin.socket.io', 'https://miko-frontend-i3vt.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(AppGateway.name);
  private roomConversations: RoomConversations = {};
  private roomMeetingMap: { [key: string]: string } = {};
  @WebSocketServer() server: Server;

  constructor(
    private readonly meetingService: MeetingService,
    private readonly middlewareService: MiddlewareService,
    private readonly conversationService: ConversationService,
    private readonly vertexService: VertexService,
    private readonly edgeService: EdgeService,
    private readonly recordService: RecordService,
    private readonly s3Service: S3Service
  ) {}

  afterInit() {
    instrument(this.server, {
      // Todo: 인증
      auth: false,
    });
  }

  handleConnection(client: Socket) {
    client['nickname'] = client.handshake.auth.nickname;
    this.logger.log(`${client['nickname']}: connected to server`);
  }

  @SubscribeMessage('disconnecting')
  async handleDisconnecting(client: Socket) {
    for (const room of client.rooms) {
      client.to(room).emit('exit', client['nickname'], this.countMember(room) - 1);

      if (this.countMember(room) === 0) {
        await this.recordService.stopRecording(room);
        // const recordingResponseDto = await this.recordService.getRecording(room);
        // const uploadResponseDto = await this.s3Service.uploadFileFromUrl(recordingResponseDto.url);

        // await this.meetingService.updateMeetingRecordKey(
        //   this.roomMeetingMap[room],
        //   uploadResponseDto.key
        // );
      }
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`${client['nickname']}: disconnected from server`);
  }

  @SubscribeMessage('enter_room')
  async handleEnterRoom(client: Socket, room: string) {
    if (!room) throw new BadRequestException('Room is empty');

    this.logger.log(`Enter Room: Start`);

    const isNewRoom = !this.rooms().includes(room);

    client.join(room);
    client.emit('entered_room');

    if (isNewRoom) {
      // Room 최초 개설했을 경우
      const meetingCreateDto: MeetingCreateDto = {
        title: room,
        owner: client['nickname'],
        record_key: ''
      };

      this.roomMeetingMap[room] = await this.meetingService.createNewMeeting(meetingCreateDto);

      console.log(`Create New Meeting Completed: ${this.roomMeetingMap[room]}`);

      const startRecordingDto: StartRecordingDto = {
        sessionId: room, // 세션 ID를 room으로 사용한다고 가정
        name: `${room}_recording`,
        hasAudio: true,
        hasVideo: false
      };
      this.recordService.startRecording(startRecordingDto);
    } else {
      // Room 중간에 입장했을 경우
      client.emit('load_meeting', this.roomMeetingMap[room]);
    }

    client.to(room).emit('welcome', client['nickname'], this.countMember(room));

    this.logger.log(`Enter Room: Finished`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, [room, msg]: [string, string]) {
    if (!room) throw new BadRequestException('Room is empty');
    if (!msg) throw new BadRequestException('Message is empty');

    client.to(room).emit('message', `${client['nickname']}: ${msg}`);
  }

  @SubscribeMessage('stt')
  async handleRecord(client: Socket, [room, file]: [string, ArrayBuffer]) {
    if (!file) throw new BadRequestException('File Not Found');
    if (!room) throw new BadRequestException('Room is empty');

    this.logger.log(`Convert STT Method: Start`);

    const currentTime = new Date();
    const buffer = Buffer.from(new Uint8Array(file));

    const newFile: Express.Multer.File = {
      buffer: buffer,
      originalname: 'temp.wav',
      mimetype: 'audio/wav',
      filename: 'temp.wav',
      size: buffer.length,
    } as Express.Multer.File;

    const convertResponseDto: ConvertResponseDto = await this.middlewareService.convertStt(newFile); // STT 변환 요청

    if (!convertResponseDto.script) throw new EmptyDataWarning(`ConvertSTT: Empty script`);

    this.emitMessage(client, room, 'script', `${client['nickname']}: ${convertResponseDto.script}`);

    let conversationCreateDto: ConversationCreateDto = {
      user: client['nickname'],
      content: convertResponseDto.script,
      timestamp: currentTime,
    };

    console.log(
      `Created STT: user: ${conversationCreateDto.user}  content: ${convertResponseDto.script}  timestamp: ${currentTime}`,
    );

    this.conversationService.createConversation(conversationCreateDto).then((contentId) => {
      // Session 에 Conversations 저장
      this.roomConversations[room][contentId] = [conversationCreateDto];
      // Meeting 에 Conversation 저장
      this.meetingService.updateMeetingField(this.roomMeetingMap[room], contentId, 'conversations', '$push');
    });

    this.logger.log(`Convert STT Method: Finished`);
  }

  @SubscribeMessage('summarize')
  public async handleSummarize(client: Socket, room: string) {
    if (!room) throw new BadRequestException('Room is empty');

    this.logger.log(`Summarize Method: Start`);

    this.printRoomConversations(room);

    if (!this.roomConversations[room]) throw new EmptyDataWarning(`SummarizeScript: Empty conversations`);

    const summarizeRequestDto: SummarizeRequestDto = {
      conversations: this.roomConversations[room],
    };

    const summarizeResponseDto: SummarizeResponseDto =
      await this.middlewareService.summarizeScript(summarizeRequestDto);

    this.logger.log(`Returned Keyword: ${summarizeResponseDto.keyword} \n Subtitle: ${summarizeResponseDto.subtitle}`);

    const responsePayload = {
      keyword: summarizeResponseDto.keyword,
      subtitle: summarizeResponseDto.subtitle,
    };

    this.emitMessage(client, room, 'summarize', responsePayload);

    await this.handleVertex(client, [room, summarizeRequestDto, summarizeResponseDto]);

    this.roomConversations[room] = {}; // 임시 저장한 대화 flush
    this.logger.log(`Summarize Method: Finished`);
  }

  @SubscribeMessage('vertex')
  async handleVertex(
    client: Socket,
    [room, summarizeRequestDto, summarizeResponseDto]: [string, SummarizeRequestDto, SummarizeResponseDto],
  ) {
    if (!room) throw new BadRequestException('Room is empty');
    if (!summarizeRequestDto) throw new BadRequestException('SummarizeRequestDto is empty');
    if (!summarizeResponseDto) throw new BadRequestException('SummarizeResponseDto is empty');

    this.logger.log(`Vertex Creation Method: Start`);

    const vertexCreateDto: VertexCreateDto = {
      keyword: summarizeResponseDto.keyword,
      subtitle: summarizeResponseDto.subtitle,
      conversationIds: Object.keys(this.roomConversations[room]),
    };

    const contentId = await this.vertexService.createVertex(vertexCreateDto);

    this.emitMessage(
      client,
      room,
      'vertex',
      `{"id": ${contentId}, "keyword": ${vertexCreateDto.keyword}, "subtitle": ${vertexCreateDto.subtitle}, conversationIds: ${vertexCreateDto.conversationIds}}`,
    );

    // Meeting 에 Vertex 저장
    await this.meetingService.updateMeetingField(this.roomMeetingMap[room], contentId, 'vertexes', '$push');

    this.logger.log(`Vertex Creation Method: Finished`);
  }

  @SubscribeMessage('edge')
  async handleEdge(client: Socket, [room, vertex1, vertex2, action]: [string, string, string, string]) {
    if (!room) throw new BadRequestException('Room is empty');
    if (!vertex1 || !vertex2) throw new BadRequestException('Vertex ID is empty');
    if (action !== '$push' && action !== '$pull') throw new BadRequestException('Invalid Action');

    this.logger.log(`Edge ${action} Method: Start`);

    const edgeRequestDto: EdgeRequestDto = {
      vertex1: vertex1,
      vertex2: vertex2,
      action: action,
    };

    const contentId = await this.edgeService.updateEdge(edgeRequestDto);

    this.emitMessage(
      client,
      room,
      'edge',
      `{"id": ${contentId}, "vertex1": ${vertex1}, "vertex2": ${vertex2}}, "action": ${action}}`,
    );

    await this.meetingService.updateMeetingField(this.roomMeetingMap[room], contentId, 'edges', action);

    this.logger.log(`Edge ${action} Method: Finished`);
  }

  private emitMessage(client: Socket, room: string, ev: string, args: any) {
    client.emit(ev, args);
    client.to(room).emit(ev, args);
  }

  private rooms(): string[] {
    if (!this.server || !this.server.sockets || !this.server.sockets.adapter) return [];

    const { sids, rooms } = this.server.sockets.adapter;

    const publicRooms: string[] = [];
    rooms.forEach((_, key) => {
      if (!sids.has(key)) {
        publicRooms.push(key);
      }
    });

    return publicRooms;
  }

  private countMember(room: string): number {
    return this.server.sockets.adapter.rooms.get(room)?.size ?? 0;
  }

  private printRoomConversations(room: string) {
    console.log(`Room: ${room}`);
    for (const contentId in this.roomConversations[room]) {
      for (const message of this.roomConversations[room][contentId]) {
        console.log(
          `Content ID: ${contentId} User: ${message.user}, Content: ${message.content}, Timestamp: ${message.timestamp}`,
        );
      }
    }
  }
}
