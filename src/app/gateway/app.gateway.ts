import { BadRequestException, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { MeetingService } from 'components/meeting/service/meeting.service';
import { MiddlewareService } from '@middleware/service/middleware.service';
import { SummarizeRequestDto } from '@middleware/dto/summarize.request.dto';
import { ConvertResponseDto } from '@middleware/dto/convert.response.dto';
import { SummarizeResponseDto } from '@middleware/dto/summarize.response.dto';
import { RoomConversations } from 'components/meeting/interface/roomConversation.interface';
import { ConversationCreateDto } from 'components/conversation/dto/conversation.create.dto';
import { ConversationService } from 'components/conversation/service/conversation.service';
import { VertexService } from 'components/vertex/service/vertex.service';
import { EdgeService } from 'components/edge/service/edge.service';
import { EmptyDataException } from 'assets/global/exception/emptyData.exception';
import { EdgeEditRequestDto } from 'components/edge/dto/edge.edit.request.dto';
import { RecordService } from '@openvidu/service/record.service';
import { StartRecordingDto } from '@openvidu/dto/recording.request.dto';
import { S3Service } from '@s3/service/s3.service';
import { RecordingResponseDto } from '@openvidu/dto/recording.response.dto';
import { VertexCreateRequestDto } from 'components/vertex/dto/vertex.create.request.dto';
import { VertexCreateResponseDto } from 'components/vertex/dto/vertex.create.response.dto';
import { EdgeEditReponseDto } from 'components/edge/dto/edge.edit.response.dto';
import { MeetingFindResponseDto } from 'components/meeting/dto/meeting.find.response.dto';
import { OpenviduService } from '@openvidu/service/openvidu.service';
import { InvalidPasswordException } from '@global/exception/invalidPassword.exception';
import { MeetingUpdateDto } from 'components/meeting/dto/meeting.update.dto';
import { RoomNotFoundException } from '@global/exception/roomNotFound.exception';

@WebSocketGateway({
  cors: {
    origin: ['https://admin.socket.io', 'https://miko-frontend-i3vt.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(AppGateway.name);
  public roomConversations: RoomConversations = {};
  public roomMeetingMap: { [key: string]: string } = {};
  public roomHostManager: { [key: string]: string } = {};
  public roomPasswordManager: { [key: string]: string } = {};
  private roomRecord: { [key: string]: { recordingId: string; createdAt: number } } = {};

  @WebSocketServer() server: Server;

  constructor(
    private readonly meetingService: MeetingService,
    private readonly middlewareService: MiddlewareService,
    private readonly conversationService: ConversationService,
    private readonly vertexService: VertexService,
    private readonly edgeService: EdgeService,
    private readonly recordService: RecordService,
    private readonly s3Service: S3Service,
    private readonly openviduService: OpenviduService,
  ) {}

  afterInit() {
    instrument(this.server, {
      auth: false,
      mode: 'development',
    });
  }

  handleConnection(client: Socket) {
    client['nickname'] = client.handshake.auth.nickname;
    this.logger.log(`${client['nickname']}: connected to server`);
  }

  async handleDisconnect(client: Socket) {
    await this.sleep(3000);
    this.logger.log(`${client['nickname']}: disconnected from server`);
  }

  @SubscribeMessage('enter_room')
  async handleEnterRoom(client: Socket, room: string, password: string) {
    console.log(`Entering Room: ${room}:${this.roomMeetingMap[room]} - Password: ${password}`);
    if (!room) throw new BadRequestException('Room is empty');
    if (!this.roomConversations[room] || !this.roomMeetingMap[room])
      throw new RoomNotFoundException('Room 이 정상적으로 생성되지 않았습니다');
    if (this.roomPasswordManager[room] != password) {
      throw new InvalidPasswordException('Invalid password');
    }

    this.logger.log(`Enter Room: Start`);

    if (this.countMember(room) == 0) {
      client.join(room);
      client.emit('entered_room');

      await this.createNewRoom(client, room);

      this.logger.log(`Enter Room: 최초 입장`);

      return;
    }

    client.join(room);
    client.emit('entered_room');

    await this.joinRoom(client, room);

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
  async handleRecord(client: Socket, [room, file, timestamp]: [string, ArrayBuffer, number]) {
    if (!file) throw new BadRequestException('File Not Found');
    if (!room) throw new BadRequestException('Room is empty');
    if (!this.roomConversations[room] || !this.roomMeetingMap[room])
      throw new RoomNotFoundException('Room 이 정상적으로 생성되지 않았습니다');

    this.logger.log(`Convert STT Method: Start`);

    const currentTime = new Date(timestamp);
    console.log(`timestamp: ${timestamp}`)
    const time_offset = currentTime.getTime() - this.roomRecord[room].createdAt;
    const buffer = Buffer.from(new Uint8Array(file));

    const newFile: Express.Multer.File = {
      buffer: buffer,
      originalname: 'temp.wav',
      mimetype: 'audio/wav',
      filename: 'temp.wav',
      size: buffer.length,
    } as Express.Multer.File;

    const convertResponseDto: ConvertResponseDto = await this.middlewareService.convertStt(newFile); // STT 변환 요청

    if (!convertResponseDto.script) throw new EmptyDataException(`ConvertSTT: Empty script`);

    this.emitMessage(client, room, 'script', `${client['nickname']}: ${convertResponseDto.script}`);

    const conversationCreateDto: ConversationCreateDto = {
      user: client['nickname'],
      script: convertResponseDto.script,
      timestamp: currentTime,
      time_offset: time_offset,
    };

    console.log(
      `Created STT: room:${room}  user: ${conversationCreateDto.user}  script: ${convertResponseDto.script}  timestamp: ${currentTime} time_offset: ${time_offset}`,
    );

    this.conversationService.createConversation(conversationCreateDto).then((_id) => {
      // Session 에 Conversations 저장
      this.roomConversations[room][_id] = [conversationCreateDto];
      // Meeting 에 Conversation 저장
      const meetingUpdateDto_convers: MeetingUpdateDto = {
        id: this.roomMeetingMap[room],
        value: _id,
        field: 'conversations',
        action: '$push',
      };

      this.meetingService.updateMeetingField(meetingUpdateDto_convers);
    });

    this.logger.log(`Convert STT Method: Finished`);
  }

  @SubscribeMessage('summarize')
  public async handleSummarize(client: Socket, room: string) {
    if (!room) throw new BadRequestException('Room is empty');
    if (!this.roomConversations[room] || !this.roomMeetingMap[room])
      throw new RoomNotFoundException('Room 이 정상적으로 생성되지 않았습니다');

    this.logger.log(`Summarize Method: Start`);

    this.printRoomConversations(room);

    if (!this.roomConversations[room]) throw new EmptyDataException(`SummarizeScript: Empty conversations`);

    const summarizeRequestDto: SummarizeRequestDto = {
      conversations: this.roomConversations[room],
    };

    const summarizeResponseDto: SummarizeResponseDto =
      await this.middlewareService.summarizeScript(summarizeRequestDto);

    console.log(`Main Subject Returned: ${summarizeResponseDto.main.keyword} - ${summarizeResponseDto.main.subject}`);
    const mainId = await this.handleVertex(client, [room, summarizeRequestDto, summarizeResponseDto.main]);

    for (const subItem of summarizeResponseDto.sub) {
      console.log(`Sub Subject Returned: ${subItem.keyword} - ${subItem.subject}`);
      const subId = await this.handleVertex(client, [room, summarizeRequestDto, subItem]);
      console.log(`Edge Create: vertex1: ${mainId} vertex2: ${subId}`);
      await this.handleEdge(client, [room, mainId, subId, '$push']);
    }

    this.roomConversations[room] = {}; // 임시 저장한 대화 flush
    this.logger.log(`Summarize Method: Finished`);
  }

  @SubscribeMessage('vertex')
  async handleVertex(
    client: Socket,
    [room, summarizeRequestDto, summarizeResponseDto]: [string, SummarizeRequestDto, any],
  ) {
    if (!room) throw new BadRequestException('Room is empty');
    if (!this.roomConversations[room] || !this.roomMeetingMap[room])
      throw new RoomNotFoundException('Room 이 정상적으로 생성되지 않았습니다');
    if (!summarizeRequestDto) throw new BadRequestException('SummarizeRequestDto is empty');
    if (!summarizeResponseDto) throw new BadRequestException('SummarizeResponseDto is empty');

    this.logger.log(`Vertex Creation Method: Start`);

    const vertexCreateRequestDto: VertexCreateRequestDto = {
      keyword: summarizeResponseDto.keyword,
      subject: summarizeResponseDto.subject,
      conversationIds: Object.keys(this.roomConversations[room]),
    };

    const vertexCreateResponseDto: VertexCreateResponseDto =
      await this.vertexService.createVertex(vertexCreateRequestDto);

    this.emitMessage(client, room, 'vertex', vertexCreateResponseDto);

    // Meeting 에 Vertex 저장
    const meetingUpdateDto_vertex: MeetingUpdateDto = {
      id: this.roomMeetingMap[room],
      value: vertexCreateResponseDto._id,
      field: 'vertexes',
      action: '$push',
    };

    await this.meetingService.updateMeetingField(meetingUpdateDto_vertex);

    this.logger.log(`Vertex Creation Method: Finished`);

    return vertexCreateResponseDto._id;
  }

  @SubscribeMessage('edge')
  async handleEdge(client: Socket, [room, vertex1, vertex2, action]: [string, string, string, string]) {
    if (!room) throw new BadRequestException('Room is empty');
    if (!this.roomConversations[room] || !this.roomMeetingMap[room])
      throw new RoomNotFoundException('Room 이 정상적으로 생성되지 않았습니다');
    if (!vertex1 || !vertex2) throw new BadRequestException('Vertex ID is empty');
    if (action !== '$push' && action !== '$pull') throw new BadRequestException('Invalid Action');

    this.logger.log(`Edge ${action} Method: Start`);

    const edgeEditRequestDto: EdgeEditRequestDto = { vertex1, vertex2 };
    const edgeEditReponseDto: EdgeEditReponseDto = await this.edgeService.updateEdge(edgeEditRequestDto, action);

    if (action == '$push') this.emitMessage(client, room, 'edge', edgeEditReponseDto);
    else this.emitMessage(client, room, 'del_edge', edgeEditReponseDto);

    const meetingUpdateDto_edge: MeetingUpdateDto = {
      id: this.roomMeetingMap[room],
      value: edgeEditReponseDto._id,
      field: 'edges',
      action: action,
    };

    await this.meetingService.updateMeetingField(meetingUpdateDto_edge);

    this.logger.log(`Edge ${action} Method: Finished`);
  }

  @SubscribeMessage('end_meeting')
  async handleRoomId(client: Socket, room: string) {
    if (!room) throw new BadRequestException('Room is empty');
    if (!this.roomConversations[room] || !this.roomMeetingMap[room])
      throw new RoomNotFoundException('Room 이 정상적으로 생성되지 않았습니다');

    const num: Number = this.countMember(room) - 1;
    console.log(`the number of people left in the room: ${num}`);

    if (this.roomHostManager[room] == client['nickname'] || num == 0) {
      const responseRecordingDto: RecordingResponseDto = await this.recordService.stopRecording(
        this.roomRecord[room].recordingId,
      );
      console.log(`recording url: ${responseRecordingDto.url}`);
      console.log(`recording status: ${responseRecordingDto.status}`);

      const meetingUpdateDto_endTime: MeetingUpdateDto = {
        id: this.roomMeetingMap[room],
        value: new Date(),
        field: 'endTime',
        action: '$push',
      };

      await this.meetingService.updateMeetingField(meetingUpdateDto_endTime);
      await this.openviduService.closeSession(room);

      this.emitMessage(client, room, 'end_meeting', this.roomMeetingMap[room]);
    } else {
      client.emit('end_meeting', this.roomMeetingMap[room]);
    }
  }

  /**
   * 클라이언트와 접속한 방에 emit 뿌리는 함수
   * @param client - Socket
   * @param room - 방 이름
   * @param ev - emit event
   * @param args - 인자
   */
  private emitMessage(client: Socket, room: string, ev: string, args: any) {
    client.emit(ev, args);
    client.to(room).emit(ev, args);
  }

  /**
   * 현재 개설된 방을 서버 전체에서 확인하는 함수
   *
   * @returns 현재 개설된 방
   */
  public roomList(): string[] {
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

  /**
   * 현재 room에 남은 인원 수 반환
   *
   * @param room - 방 이름
   * @returns 남은 인원 수
   */
  private countMember(room: string): number {
    return this.server.sockets.adapter.rooms.get(room)?.size ?? 0;
  }

  /**
   * Sleep Timer
   * @param time - milisecond
   * @returns
   */
  private sleep(time: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  /**
   * 현재 room에 keyword를 추출하지 않은 converstaion 리스트 출력 함수
   *
   * @param room - 방 이름
   */
  private printRoomConversations(room: string) {
    console.log(`Room: ${room}`);
    for (const _id in this.roomConversations[room]) {
      for (const message of this.roomConversations[room][_id]) {
        console.log(
          `Content ID: ${_id} User: ${message.user}, Script: ${message.script}, Timestamp: ${message.timestamp}`,
        );
      }
    }
  }

  /**
   * 방에 처음 입장했을 때 Session 초기화 및 DB에 meeting 생성. room 이름과 meeting 맵핑하는 함수
   *
   * @param client - Socket
   * @param room - 방 이름
   */
  private async createNewRoom(client: Socket, room: string) {
    // Room 최초 개설했을 경우
    this.logger.log('Create Room Method: Initiated');

    const startRecordingDto: StartRecordingDto = {
      sessionId: room, // 세션 ID를 room 으로 사용한다고 가정
      name: `${room}_recording`,
      hasAudio: true,
      hasVideo: false,
    };

    const recordingResponseDto: RecordingResponseDto = await this.recordService.startRecording(startRecordingDto);
    this.roomRecord[room] = { recordingId: recordingResponseDto.id, createdAt: recordingResponseDto.createdAt };

    const meetingUpdateDto_record: MeetingUpdateDto = {
      id: this.roomMeetingMap[room],
      value: recordingResponseDto.id,
      field: 'record',
      action: '$push',
    };

    const meetingUpdateDto_startTime: MeetingUpdateDto = {
      id: this.roomMeetingMap[room],
      value: new Date(recordingResponseDto.createdAt),
      field: 'startTime',
      action: '$push',
    };

    await this.meetingService.updateMeetingField(meetingUpdateDto_record);
    await this.meetingService.updateMeetingField(meetingUpdateDto_startTime);

    console.log(`Create New Meeting Completed: ${room}: ${this.roomMeetingMap[room]}`);
    this.logger.log('Create Room Method: Complete');
  }

  /**
   * 기존 방에 들어갔을 때 DB에서 기존에 진행된 Data를 Client에 반환해주는 함수
   *
   * @param client - Socket
   * @param room - string 방 이름
   */
  private async joinRoom(client: Socket, room: string) {
    this.logger.log('Join Room Method: Initiated');

    const meetingFindResponseDto: MeetingFindResponseDto = await this.meetingService.findOne(this.roomMeetingMap[room]);

    // 기존 대화(conversations) 전송
    const conversations = await this.conversationService.findConversation(meetingFindResponseDto.conversationIds);
    for (const conversation of conversations) {
      client.emit('script', `${conversation.user}: ${conversation.script}`);
      await this.sleep(50);
    }

    // 기존 버텍스(vertices) 전송
    const vertexes = await this.vertexService.findVertexes(meetingFindResponseDto.vertexIds);
    for (const vertex of vertexes) {
      client.emit('vertex', vertex);
      await this.sleep(50);
    }

    // 기존 에지(edges) 전송
    const edges = await this.edgeService.findEdges(meetingFindResponseDto.edgeIds);
    for (const edge of edges) {
      client.emit('edge', edge);
      await this.sleep(50);
    }

    this.logger.log('Join Room Method: Complete');
  }
}
