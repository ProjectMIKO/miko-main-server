import { BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
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
import { SummarizeResponseDto, SummaryBody } from '@middleware/dto/summarize.response.dto';
import { RoomConversations } from 'components/meeting/interface/roomConversation.interface';
import { ConversationCreateDto } from 'components/conversation/dto/conversation.create.dto';
import { ConversationService } from 'components/conversation/service/conversation.service';
import { VertexService } from 'components/vertex/service/vertex.service';
import { EdgeService } from 'components/edge/service/edge.service';
import { EmptyDataException } from 'assets/global/exception/emptyData.exception';
import { EdgeEditRequestDto } from 'components/edge/dto/edge.edit.request.dto';
import { RecordService } from '@openvidu/service/record.service';
import { StartRecordingDto } from '@openvidu/dto/recording.request.dto';
import { RecordingResponseDto } from '@openvidu/dto/recording.response.dto';
import { VertexCreateRequestDto } from 'components/vertex/dto/vertex.create.request.dto';
import { VertexCreateResponseDto } from 'components/vertex/dto/vertex.create.response.dto';
import { EdgeEditReponseDto } from 'components/edge/dto/edge.edit.response.dto';
import { MeetingFindResponseDto } from 'components/meeting/dto/meeting.find.response.dto';
import { InvalidPasswordException } from '@global/exception/invalidPassword.exception';
import { MeetingUpdateDto } from 'components/meeting/dto/meeting.update.dto';
import { RoomNotFoundException } from '@global/exception/roomNotFound.exception';
import { Mutex } from 'async-mutex';

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
  public roomRecord: { [key: string]: { recordingId: string; createdAt: number } } = {};
  private readonly roomMutexes: { [key: string]: Mutex } = {};
  public roomVertexHandler: { [key: string]: { vertexData: { keyword: string; id: string }[] } } = {};

  @WebSocketServer() server: Server;

  constructor(
    private readonly meetingService: MeetingService,
    private readonly middlewareService: MiddlewareService,
    private readonly conversationService: ConversationService,
    private readonly vertexService: VertexService,
    private readonly edgeService: EdgeService,
    private readonly recordService: RecordService,
  ) {}

  afterInit() {
    instrument(this.server, {
      auth: false,
      mode: 'development',
    });
  }

  handleConnection(client: Socket) {
    client['nickname'] = client.handshake.auth.nickname;
    client['image'] = client.handshake.auth.image;
    this.logger.log(`${client['nickname']}: connected to server`);
  }

  async handleDisconnect(client: Socket) {
    await this.sleep(3000);
    this.logger.log(`${client['nickname']}: disconnected from server`);
  }

  @SubscribeMessage('enter_room')
  async handleEnterRoom(client: Socket, [room, password]: [string, string]) {
    console.log(`Entering Room: ${room}:${this.roomMeetingMap[room]} - Password: ${password}`);
    if (!room) throw new BadRequestException('Room is empty');
    if (!this.roomConversations[room] || !this.roomMeetingMap[room])
      throw new RoomNotFoundException('Room 이 정상적으로 생성되지 않았습니다');
    if (this.roomPasswordManager[room] != password) {
      throw new InvalidPasswordException('Invalid password');
    }

    this.logger.log(`Enter Room: Start`);

    if (room == 'MIKO') {
      await this.joinRoom(client, room);
    } else if (this.countMember(room) == 0) {
      await this.createNewRoom(client, room);
      this.logger.log(`Enter Room: 최초 입장`);
    } else {
      await this.joinRoom(client, room);
    }

    client.join(room);
    client.emit('entered_room');

    const ownerObject = {
      name: client['nickname'],
      role: 'member',
      image: client['image'],
    };

    const meetingUpdateDto_owner: MeetingUpdateDto = {
      id: this.roomMeetingMap[room],
      value: ownerObject,
      field: 'owner',
      action: '$push',
    };
    await this.meetingService.updateMeetingField(meetingUpdateDto_owner);

    this.logger.log(`Enter Room: Finished`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, [room, msg]: [string, string]) {
    if (!room) throw new BadRequestException('Room is empty');
    if (!msg) throw new BadRequestException('Message is empty');

    client.to(room).emit('message', `${client['nickname']}: ${msg}`);
  }

  @SubscribeMessage('stt')
  async handleRecord(client: Socket, [room, file, timestamp]: [string, any, number]) {
    if (!file) throw new BadRequestException('File Not Found');
    if (!room) throw new BadRequestException('Room is empty');
    if (!this.roomConversations[room] || !this.roomMeetingMap[room])
      throw new RoomNotFoundException('Room 이 정상적으로 생성되지 않았습니다');

    this.logger.log(`Convert STT Method: Start`);
    const roomId = this.roomMeetingMap[room]; // 회의 종료 후 stt 요청시 this.roomMeetingMap[room]가 undefined되는 문제가 있음

    // Blob 크기 확인 (KB 단위로 변환)
    const fileSize = file.size || file.byteLength || file.length;
    const fileSizeInKB = (fileSize / 1024).toFixed(2);
    console.log(`파일 크기: ${fileSizeInKB} KB`);

    // 타임스탬프를 한국 시간으로 변환
    const currentTime = new Date(timestamp);
    const koreanTime = new Date(currentTime.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
    console.log(`시간: ${koreanTime.toLocaleString()}`);
    const time_offset = currentTime.getTime() - this.roomRecord[room].createdAt;

    const convertResponseDto: ConvertResponseDto = await this.middlewareService.convertStt(file); // STT 변환 요청

    if (!convertResponseDto.script) throw new EmptyDataException(`ConvertSTT: Empty script`);

    if (convertResponseDto.script.length < 4) {
      this.logger.warn(`Too short Script: ${convertResponseDto.script}`);
      return;
    }

    this.emitMessage(client, room, 'script', `${client['nickname']}|${client['image']}|${convertResponseDto.script}`);

    const conversationCreateDto: ConversationCreateDto = {
      user: client['nickname'],
      script: convertResponseDto.script,
      timestamp: currentTime,
      time_offset: time_offset,
    };

    console.log(
      `Created STT: room:${room}  user: ${conversationCreateDto.user}  script: ${convertResponseDto.script}  timestamp: ${currentTime} time_offset: ${time_offset}`,
    );

    const conversationId = await this.conversationService.createConversation(conversationCreateDto);
    // Session 에 Conversations 저장
    this.roomConversations[room][conversationId] = [conversationCreateDto];
    // Meeting 에 Conversation 저장
    const meetingUpdateDto_convers: MeetingUpdateDto = {
      id: roomId,
      value: conversationId,
      field: 'conversations',
      action: '$push',
    };

    this.meetingService.updateMeetingField(meetingUpdateDto_convers);

    // roomConversations 가 5개 이상 되면 handleSummarize 호출
    console.log(`${this.roomConversations[room].length}`);
    if (Object.keys(this.roomConversations[room]).length >= 5) await this.handleSummarize(client, room);

    this.logger.log(`Convert STT Method: Finished`);
  }

  @SubscribeMessage('summarize')
  public async handleSummarize(client: Socket, room: string) {
    if (!this.roomMutexes[room]) {
      console.log('lock');
      this.roomMutexes[room] = new Mutex();
    }

    const release = await this.roomMutexes[room].acquire();

    if (!room) throw new BadRequestException('Room is empty');
    if (!this.roomConversations[room] || !this.roomMeetingMap[room])
      throw new RoomNotFoundException('Room 이 정상적으로 생성되지 않았습니다');

    try {
      this.logger.log(`Summarize Method: Start`);

      this.printRoomConversations(room);
      if (!this.roomConversations[room] || Object.keys(this.roomConversations[room]).length === 0)
        throw new EmptyDataException(`SummarizeScript: Empty conversations`);

      const summarizeRequestDto: SummarizeRequestDto = {
        conversations: this.roomConversations[room],
      };

      const summarizeResponseDto: SummarizeResponseDto =
        await this.middlewareService.summarizeScript(summarizeRequestDto);

      for (const idea of summarizeResponseDto.idea) {
        console.log(`Main 항목 반환: ${idea.main.keyword} - ${idea.main.subject}`);
        const existingVertex = this.roomVertexHandler[room]?.vertexData.find(
          (vertex) => vertex.keyword === idea.main.keyword,
        );
        let mainId: string;

        if (existingVertex) {
          console.log(`중복된 vertex 발견: ${existingVertex.keyword} - ${existingVertex.id}`);
          mainId = existingVertex.id;
        } else {
          mainId = await this.handleVertex(client, [room, summarizeRequestDto, idea.main, 0]);
          console.log(`새로운 vertex 생성: ${idea.main.keyword} - ${mainId}`);

          this.roomVertexHandler[room].vertexData.push({ keyword: idea.main.keyword, id: mainId });
        }

        if (idea.sub) {
          await this.processSubItems(client, room, summarizeRequestDto, mainId, idea.sub, 1);
        }
      }

      this.roomConversations[room] = {}; // 임시 저장한 대화 플러시
      this.logger.log(`Summarize Method: Finished`);
    } finally {
      release();
    }
  }

  @SubscribeMessage('vertex')
  async handleVertex(
    client: Socket,
    [room, summarizeRequestDto, summaryBody, priority]: [string, SummarizeRequestDto, SummaryBody, number],
  ) {
    if (!room) throw new BadRequestException('Room is empty');
    if (!this.roomConversations[room] || !this.roomMeetingMap[room])
      throw new RoomNotFoundException('Room 이 정상적으로 생성되지 않았습니다');
    if (!summarizeRequestDto) throw new BadRequestException('SummarizeRequestDto is empty');
    if (!summaryBody) throw new BadRequestException('SummarizeResponseDto is empty');

    this.logger.log(`Vertex Creation Method: Start`);

    const vertexCreateRequestDto: VertexCreateRequestDto = {
      keyword: summaryBody.keyword,
      subject: summaryBody.subject,
      priority: priority,
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
      const roomId = this.roomMeetingMap[room];
      const recordingId = this.roomRecord[room].recordingId;
      this.stopRecording(roomId, recordingId).then(() => this.saveMom(roomId));
      this.emitMessage(client, room, 'end_meeting', this.roomMeetingMap[room]);
      delete this.roomMeetingMap[room];
      delete this.roomHostManager[room];
      delete this.roomConversations[room];
      delete this.roomPasswordManager[room];
      delete this.roomVertexHandler[room];
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
    console.log(`Room conversations count: ${Object.keys(this.roomConversations[room]).length}`);
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

    // room 값을 base64url로 인코딩
    const encodedSessionId = Buffer.from(room).toString('base64url');

    const startRecordingDto: StartRecordingDto = {
      sessionId: encodedSessionId,
      name: `${encodedSessionId}_recording`,
      hasAudio: true,
      hasVideo: false,
    };

    const recordingResponseDto: RecordingResponseDto = await this.recordService.startRecording(startRecordingDto);

    if (recordingResponseDto?.createdAt == null) {
      console.log(recordingResponseDto);
      console.log(recordingResponseDto.status);
      throw new InternalServerErrorException('Failed to start recording or create the room');
    }

    this.roomRecord[room] = { recordingId: recordingResponseDto.id, createdAt: recordingResponseDto.createdAt };

    const meetingUpdateDto_record: MeetingUpdateDto = {
      id: this.roomMeetingMap[room],
      value: recordingResponseDto.id,
      field: 'record',
      action: '$set',
    };

    const meetingUpdateDto_startTime: MeetingUpdateDto = {
      id: this.roomMeetingMap[room],
      value: new Date(recordingResponseDto.createdAt),
      field: 'startTime',
      action: '$set',
    };

    this.roomVertexHandler[room] = { vertexData: [] };

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

    const batchSize = 10;
    // 대화(conversations) 전송
    const conversations = await this.conversationService.findConversation(meetingFindResponseDto.conversationIds);

    // 새로운 대화 객체 생성
    const newConversations = conversations.map((conversation) => {
      const owner = meetingFindResponseDto.owner.find((owner) => owner.name === conversation.user);
      return {
        ...conversation.toObject(),
        image: owner ? owner.image : undefined,
      };
    });

    for (let i = 0; i < conversations.length; i += batchSize) {
      const batch = newConversations.slice(i, i + batchSize);
      client.emit('scriptBatch', batch);
    }
    // 버텍스(vertices) 전송
    const vertexes = await this.vertexService.findVertexes(meetingFindResponseDto.vertexIds);
    for (let i = 0; i < vertexes.length; i += batchSize) {
      const batch = vertexes.slice(i, i + batchSize);
      client.emit('vertexBatch', batch);
    }

    // 에지(edges) 전송
    const edges = await this.edgeService.findEdges(meetingFindResponseDto.edgeIds);
    for (let i = 0; i < edges.length; i += batchSize) {
      const batch = edges.slice(i, i + batchSize);
      client.emit('edgeBatch', batch);
    }

    this.logger.log('Join Room Method: Complete');
  }

  private async stopRecording(roomId: string, recordingId: string) {
    console.log(`${roomId}: stop recording 시작`);

    const responseRecordingDto: RecordingResponseDto = await this.recordService.stopRecording(recordingId);
    console.log(`recording url: ${responseRecordingDto.url}`);
    console.log(`recording status: ${responseRecordingDto.status}`);

    const meetingUpdateDto_endTime: MeetingUpdateDto = {
      id: roomId,
      value: new Date(),
      field: 'endTime',
      action: '$set',
    };

    await this.meetingService.updateMeetingField(meetingUpdateDto_endTime);
    console.log(`${roomId}: stop recording 종료`);
  }

  /**
   * summarize 정점 및 간선 처리 함수
   * @param client - 클라이언트 소켓.
   * @param room - 방 식별자.
   * @param summarizeRequestDto - 요약 요청 데이터 전송 객체.
   * @param parentId - 부모 정점 ID.
   * @param subItems - 처리할 하위 항목 배열.
   * @param level - 재귀의 현재 깊이 수준.
   */
  async processSubItems(client, room, summarizeRequestDto, parentId, subItems, level) {
    for (const subItem of subItems) {
      console.log(`Sub${level} 항목 반환: ${subItem.keyword} - ${subItem.subject}`);
      const existingVertex = this.roomVertexHandler[room]?.vertexData.find(
        (vertex) => vertex.keyword === subItem.keyword,
      );
      let subId;

      if (existingVertex) {
        console.log(`중복된 vertex 발견: ${existingVertex.keyword} - ${existingVertex.id}`);
        subId = existingVertex.id;
      } else {
        subId = await this.handleVertex(client, [room, summarizeRequestDto, subItem, level]);
        console.log(`새로운 vertex 생성: ${subItem.keyword} - ${subId}`);

        // roomVertexHandler에 keyword와 id 저장
        this.roomVertexHandler[room].vertexData.push({ keyword: subItem.keyword, id: subId });
      }

      console.log(`간선 생성: vertex1: ${parentId} vertex2: ${subId}`);
      await this.handleEdge(client, [room, parentId, subId, '$push']);

      if (subItem.sub) {
        await this.processSubItems(client, room, summarizeRequestDto, subId, subItem.sub, level + 1);
      }
    }
  }

  private async saveMom(roomId: string) {
    console.log(`${roomId}: save mom 시작`);

    const meetingFindResponseDto: MeetingFindResponseDto = await this.meetingService.findOne(roomId);

    // Conversations 및 Vertexes 조회
    const conversations = await this.conversationService.findConversation(meetingFindResponseDto.conversationIds);
    const vertexes = await this.vertexService.findVertexes(meetingFindResponseDto.vertexIds);

    if (!Array.isArray(conversations) || conversations.length === 0) {
      console.log('Conversations are empty');
      const meetingUpdateDto_mom: MeetingUpdateDto = {
        id: roomId,
        value: 'Conversations are empty',
        field: 'mom',
        action: '$set',
      };
      await this.meetingService.updateMeetingField(meetingUpdateDto_mom);
      return;
    }

    // 회의록 추출
    const meetingResponseDto: MeetingFindResponseDto = await this.middlewareService.extractMom(conversations, vertexes);

    // 회의 기간 계산
    const periodMillis = meetingFindResponseDto.endTime.getTime() - meetingFindResponseDto.startTime.getTime();
    meetingResponseDto.period = periodMillis;

    // Meeting에 Mom 업데이트
    const meetingUpdateDto_mom: MeetingUpdateDto = {
      id: roomId,
      value: meetingResponseDto.mom,
      field: 'mom',
      action: '$set',
    };

    const meetingUpdateDto_period: MeetingUpdateDto = {
      id: roomId,
      value: meetingResponseDto.period,
      field: 'period',
      action: '$set',
    };

    await this.meetingService.updateMeetingField(meetingUpdateDto_mom);
    await this.meetingService.updateMeetingField(meetingUpdateDto_period);
    console.log(`${roomId}: save mom 종료`);
  }
}
