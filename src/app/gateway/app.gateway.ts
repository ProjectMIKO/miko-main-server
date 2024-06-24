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
import { MeetingService } from '@service/meeting.service';
import { MiddlewareService } from '@service/middleware.service';
import { MeetingCreateDto } from '@dto/meeting.create.dto';
import { Edge } from '@schema/edge.schema';
import { VertexCreateDto } from '@dto/vertex.create.dto';
import { SummarizeRequestDto } from '@dto/summarize.request.dto';
import { ConvertResponseDto } from '@dto/convert.response.dto';
import { SummarizeResponseDto } from '@dto/summarize.response.dto';
import { RoomConversations } from '@meeting/interface/roomConversation.interface';
import { ConversationCreateDto } from '@dto/conversation.create.dto';
import { ConversationService } from '@service/conversation.service';
import { VertexService } from '@service/vertex.service';
import { EdgeService } from '@service/edge.service';
import { EmptyDataWarning } from '@global/warning/emptyData.warning';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello MIKO!';
  }
}

@WebSocketGateway({
  cors: {
    origin: [
      'https://admin.socket.io',
      'https://miko-frontend-i3vt.vercel.app',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private roomConversations: RoomConversations = {};
  private roomMeetingMap: { [key: string]: string } = {};
  @WebSocketServer() server: Server;

  constructor(
    private readonly meetingService: MeetingService,
    private readonly middlewareService: MiddlewareService,
    private readonly conversationService: ConversationService,
    private readonly nodeService: VertexService,
    private readonly edgeService: EdgeService,
  ) {}

  afterInit() {
    instrument(this.server, {
      // Todo: 인증
      auth: false,
    });
  }

  handleConnection(client: Socket, username: string) {
    client['nickname'] = client.handshake.auth.nickname;
    console.log(`${client['nickname']}: connected to server`);
  }

  @SubscribeMessage('disconnecting')
  handleDisconnecting(client: Socket, reason: string) {
    client.rooms.forEach((room) =>
      client
        .to(room)
        .emit('exit', client['nickname'], this.countMember(room) - 1),
    );
  }

  handleDisconnect(client: Socket) {
    console.log(`${client['nickname']}: disconnected from server`);
  }

  @SubscribeMessage('enter_room')
  async handleEnterRoom(client: Socket, room: string) {
    const isNewRoom = !this.rooms().includes(room);

    client.join(room);
    client.emit('entered_room');

    if (isNewRoom) {
      // Room 최초 개설했을 경우
      const meetingCreateDto: MeetingCreateDto = {
        title: room,
        owner: client['nickname'],
      };

      this.roomMeetingMap[room] =
        await this.meetingService.createNewMeeting(meetingCreateDto);

      console.log(`Create New Meeting Completed: ${this.roomMeetingMap[room]}`);

      this.roomConversations[room] = {};
    } else {
      // Room 중간에 입장했을 경우
      client.emit('load_meeting', this.roomMeetingMap[room]);
    }

    client.to(room).emit('welcome', client['nickname'], this.countMember(room));
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, [room, msg, done]: [string, string, Function]) {
    client.to(room).emit('message', `${client['nickname']}: ${msg}`);
    done();
  }

  @SubscribeMessage('stt')
  async handleRecord(client: Socket, [room, file]: [string, ArrayBuffer]) {
    if (!file) throw new BadRequestException('File Not Found');

    if (!room) throw new BadRequestException('Room is empty');

    const currentTime = new Date();
    const buffer = Buffer.from(new Uint8Array(file));

    const newFile: Express.Multer.File = {
      buffer: buffer,
      originalname: 'temp.wav',
      mimetype: 'audio/wav',
      filename: 'temp.wav',
      size: buffer.length,
    } as Express.Multer.File;

    const convertResponseDto: ConvertResponseDto =
      await this.middlewareService.convertStt(newFile); // STT 변환 요청

    if (!convertResponseDto.script)
      throw new EmptyDataWarning(`ConvertSTT: Empty script`);

    client.emit('script', `${client.id}: ${convertResponseDto.script}`);
    client
      .to(room)
      .emit('script', `${client.id}: ${convertResponseDto.script}`);

    let conversationCreateDto: ConversationCreateDto = {
      user: client['nickname'],
      content: convertResponseDto.script,
      timestamp: currentTime,
    };

    console.log(
      `Created STT: user: ${conversationCreateDto.user}  content: ${convertResponseDto.script}  timestamp: ${currentTime}`,
    );

    this.conversationService
      .createNewConversation(conversationCreateDto)
      .then((contentId) => {
        // Session 에 Conversations 저장
        this.roomConversations[room][contentId] = [conversationCreateDto];
        // Meeting 에 Conversation 저장
        this.meetingService.addConversationToMeeting(
          this.roomMeetingMap[room],
          contentId,
        );
      });
  }

  @SubscribeMessage('summarize')
  public async handleSummarize(client: Socket, room: string) {
    // room = testModule(); // Test Module

    this.printRoomConversations(room);

    if (!this.roomConversations[room])
      throw new EmptyDataWarning(`SummarizeScript: Empty conversations`);

    const summarizeRequestDto: SummarizeRequestDto = {
      conversations: this.roomConversations[room],
    };

    const summarizeResponseDto: SummarizeResponseDto =
      await this.middlewareService.summarizeScript(summarizeRequestDto);

    console.log(
      `Returned Keyword: ${summarizeResponseDto.keyword} \n Subtitle: ${summarizeResponseDto.subtitle}`,
    );

    const responsePayload = {
      keyword: summarizeResponseDto.keyword,
      subtitle: summarizeResponseDto.subtitle,
    };

    client.emit('summarize', responsePayload);
    client.to(room).emit('summarize', responsePayload);

    await this.handleVertex(client, [
      room,
      summarizeRequestDto,
      summarizeResponseDto,
    ]);

    this.roomConversations[room] = {}; // 임시 저장한 대화 flush
  }

  @SubscribeMessage('vertex')
  public async handleVertex(
    client: Socket,
    [room, summarizeRequestDto, summarizeResponseDto]: [
      string,
      SummarizeRequestDto,
      SummarizeResponseDto,
    ],
  ) {
    const vertexCreateDto: VertexCreateDto = {
      keyword: summarizeResponseDto.keyword,
      subtitle: summarizeResponseDto.subtitle,
      conversationIds: Object.keys(this.roomConversations[room]),
    };

    client.emit(
      'vertex',
      `{"keyword": ${vertexCreateDto.keyword}, "subtitle": ${vertexCreateDto.subtitle}, conversationIds: ${vertexCreateDto.conversationIds}}`,
    );
    client
      .to(room)
      .emit(
        'vertex',
        `{"keyword": ${vertexCreateDto.keyword}, "subtitle": ${vertexCreateDto.subtitle}, conversationIds: ${vertexCreateDto.conversationIds}}`,
      );

    this.nodeService.createNewVertex(vertexCreateDto).then((contentId) => {
      // Meeting 에 Vertex 저장
      this.meetingService.addVertexToMeeting(
        this.roomMeetingMap[room],
        contentId,
      );
    });
  }

  @SubscribeMessage('Edge')
  handleEdge(client: Socket, [room, edge, done]: [string, Edge, Function]) {
    client.to(room).emit('Edge', edge);
    done();
  }

  private rooms(): string[] {
    if (!this.server || !this.server.sockets || !this.server.sockets.adapter)
      return [];

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

  /** Test Module
   *
   * @private Summarize Test Module
   * @return roomName(TEST)
   */
  private testModule(): string {
    this.roomConversations['Test'] = {
      ID1: [
        {
          user: 'USER1',
          content: '안녕하세요 회의시작할게요',
          timestamp: new Date(),
        },
      ],
      ID2: [
        {
          user: 'USER2',
          content: '그럼 우리가 만들 프로젝트의 아이디어를 말해볼까요?',
          timestamp: new Date(),
        },
      ],
      ID3: [
        {
          user: 'USER1',
          content: '좋습니다 빨리 이야기해보죠',
          timestamp: new Date(),
        },
      ],
    };

    return 'Test';
  }
}
