import { BadRequestException, Injectable, UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { MeetingService } from '../../meeting/service/meeting.service';
import { MiddlewareService } from '../../middleware/service/middleware.service';
import { MeetingCreateDto } from '../../meeting/dto/meeting.create.dto';
import { Edge } from '../../meeting/schema/edge.schema';
import { NodeCreateDto } from '../../meeting/dto/node.create.dto';
import { SummarizeRequestDto } from '../../middleware/dto/summarize.request.dto';
import { ConvertResponseDto } from '../../middleware/dto/convert.response.dto';
import { SummarizeResponseDto } from '../../middleware/dto/summarize.response.dto';
import { WebSocketExceptionsFilter } from '../../global/filter/webSocketExceptions.filter';
import { InvalidMiddlewareException } from '@nestjs/core/errors/exceptions/invalid-middleware.exception';
import { InvalidResponseException } from '../../global/exception/invalidResponse.exception';
import { FileNotFoundException } from '../../global/exception/findNotFound.exception';
import { RoomConversations } from '../../meeting/interface/roomConversation.interface';
import { ConversationCreateDto } from '../../conversation/dto/conversation.create.dto';
import { ConversationService } from '../../conversation/service/conversation.service';

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
@UseFilters(new WebSocketExceptionsFilter())
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private roomConversations: RoomConversations = {};
  @WebSocketServer() server: Server;

  constructor(
    private readonly meetingService: MeetingService,
    private readonly middlewareService: MiddlewareService,
    private readonly conversationService: ConversationService,
  ) {}

  afterInit() {
    instrument(this.server, {
      // Todo: 인증
      auth: false,
    });
  }

  handleConnection(socket: Socket, username: string) {
    socket['nickname'] = username;
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
    // Todo: 유저 접속 종료시 로직 추가
  }

  @SubscribeMessage('enter_room')
  handleEnterRoom(client: Socket, room: string) {
    const isNewRoom = !this.rooms().includes(room);

    client.join(room);
    client.emit('entered_room');

    if (isNewRoom) {
      // 최초 룸 개설 시 수행할 로직
      const meetingCreateDto: MeetingCreateDto = {
        title: `Room: ${room}`,
        owner: client.id,
      };
      this.meetingService.createNewMeeting(meetingCreateDto).catch((error) => {
        throw new InvalidResponseException('CreateNewMeeting');
      });
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
    if (!file) throw new FileNotFoundException();

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

    if (convertResponseDto.script === '')
      throw new InvalidMiddlewareException('ConvertStt');

    client.emit('script', `${client.id}: ${convertResponseDto.script}`);
    client
      .to(room)
      .emit('script', `${client.id}: ${convertResponseDto.script}`);

    let conversationCreateDto: ConversationCreateDto = {
      user: client.id,
      content: convertResponseDto.script,
      timestamp: currentTime,
    };

    console.log('user: ' + client.id);
    console.log('content: ' + convertResponseDto.script);
    console.log('timestamp: ' + currentTime);

    this.conversationService
      .createNewConversation(conversationCreateDto)
      .then((contentId) => {
        this.roomConversations[room][contentId].push(conversationCreateDto);

        // 전체 Room Conversation 출력
        for (const room in this.roomConversations) {
          console.log(`Room: ${room}`);
          for (const contentId in this.roomConversations[room]) {
            console.log(`  Content ID: ${contentId}`);
            for (const message of this.roomConversations[room][contentId]) {
              console.log(
                `    User: ${message.user}, Content: ${message.content}, Timestamp: ${message.timestamp}`,
              );
            }
          }
        }
      })
      .catch((error) => {
        throw new InvalidResponseException('CreateNewConversation');
      });
  }

  @SubscribeMessage('summarize')
  handleSummarize(client: Socket, room: string) {
    let summarizeRequestDto: SummarizeRequestDto = {
      conversations: this.roomConversations[room],
    };

    for (const room in this.roomConversations) {
      console.log(`Room: ${room}`);
      for (const contentId in this.roomConversations[room]) {
        console.log(`  Content ID: ${contentId}`);
        for (const message of this.roomConversations[room][contentId]) {
          console.log(
            `    User: ${message.user}, Content: ${message.content}, Timestamp: ${message.timestamp}`,
          );
        }
      }
    }

    this.middlewareService
      .summarizeScript(summarizeRequestDto)
      .catch((error) => {
        throw new InvalidMiddlewareException('SummarizeScript');
      })
      .then((summarizeResponseDto) => {
        this.handleNode(client, [
          room,
          summarizeRequestDto,
          summarizeResponseDto,
        ]);
      });
  }

  @SubscribeMessage('receiveNode')
  handleNode(
    client: Socket,
    [room, summarizeRequestDto, summarizeResponseDto]: [
      string,
      SummarizeRequestDto,
      SummarizeResponseDto,
    ],
  ) {
    const nodeCreateDto: NodeCreateDto = {
      keyword: summarizeResponseDto.keyword,
      summary: summarizeResponseDto.subtitle,
      conversationIds: [this.roomConversations[room].toString()],
    };
    this.meetingService.createNewNode(nodeCreateDto);
    client.emit('sendNode', nodeCreateDto);
    client.to(room).emit('sendNode', nodeCreateDto);
  }

  @SubscribeMessage('receiveEdge')
  handleEdge(client: Socket, [room, edge, done]: [string, Edge, Function]) {
    client.to(room).emit('sendEdge', edge);
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
}
