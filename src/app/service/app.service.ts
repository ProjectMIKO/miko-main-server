import { InvalidPasswordException } from '@global/exception/invalidPassword.exception';
import { RoomExistException } from '@global/exception/roomExist.exception';
import { RoomNotFoundException } from '@global/exception/roomNotFound.exception';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RecordingResponseDto } from '@openvidu/dto/recording.response.dto';
import { RecordService } from '@openvidu/service/record.service';
import { AppGateway } from 'app/gateway/app.gateway';
import { MeetingCreateDto } from 'components/meeting/dto/meeting.create.dto';
import { MeetingFindResponseDto } from 'components/meeting/dto/meeting.find.response.dto';
import { Owner } from 'components/meeting/schema/meeting.schema';
import { MeetingService } from 'components/meeting/service/meeting.service';
import { VertexService } from 'components/vertex/service/vertex.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly meetingService: MeetingService,
    private readonly recordService: RecordService,
    private readonly appGateway: AppGateway,
    private readonly vertexService: VertexService,
  ) {}

  public getHello(): string {
    return 'Hello MIKO!';
  }

  /**
   * 새로운 방에 입장했을 때 Session 초기화 및 DB에 meeting 생성. room 이름과 meeting 맵핑하는 메서드
   *
   * @param nickname - 이름
   * @param nickname - 이름
   * @param room - 방 이름
   * @param password - 비밀번호
   * @returns 성공 여부
   * @param password - 비밀번호
   * @returns 성공 여부
   */
  public async createNewRoom(nickname: string, room: string, password: string, image: string): Promise<boolean> {
    console.log(nickname, room, password);

    if (!nickname) throw new BadRequestException('Nickname is empty');
    if (!room) throw new BadRequestException('Room is empty');
    if (!password) throw new BadRequestException('Password is empty');

    this.logger.log('Create Room Method: Initiated');

    console.log('Existing rooms:', Object.keys(this.appGateway.roomMeetingMap));

    if (this.appGateway.roomMeetingMap[room]) throw new RoomExistException(`${room} is an existing room`);

    const ownerObject: Owner = {
      name: nickname,
      role: 'host',
      image: image,
    };

    const meetingCreateDto: MeetingCreateDto = {
      title: room,
      owner: [ownerObject], // 객체 배열로 설정
    };

    this.appGateway.roomMeetingMap[room] = await this.meetingService.createNewMeeting(meetingCreateDto);
    this.appGateway.roomPasswordManager[room] = password;
    this.appGateway.roomHostManager[room] = nickname;
    this.appGateway.roomConversations[room] = {};

    console.log(`Create New Meeting Completed: ${room}: ${this.appGateway.roomMeetingMap[room]}`);
    this.logger.log('Create Room Method: Complete');

    return true;
  }

  public async generateTestRoom(nickname: string, room: string, password: string, meetingId: string): Promise<boolean> {
    if (!nickname) throw new BadRequestException('Nickname is empty');
    if (!room) throw new BadRequestException('Room is empty');
    if (!password) throw new BadRequestException('Password is empty');
    if (!meetingId) throw new BadRequestException('MeetingID is empty');

    this.logger.warn(`Test Room Generated Request: ${nickname}/${room}/${password}/${meetingId}`);

    if (this.appGateway.roomMeetingMap[room]) throw new RoomExistException(`${room} is an existing room`);

    this.appGateway.roomMeetingMap[room] = meetingId;
    this.appGateway.roomPasswordManager[room] = password;
    this.appGateway.roomHostManager[room] = nickname;
    this.appGateway.roomConversations[room] = {};

    const meetingFindResponseDto: MeetingFindResponseDto = await this.meetingService.findOne(meetingId);
    const vertexes = await this.vertexService.findVertexes(meetingFindResponseDto.vertexIds);

    this.appGateway.roomVertexHandler[room] = { vertexData: [] };
    this.appGateway.roomVertexHandler[room].vertexData = vertexes.map((vertex) => ({
      keyword: vertex.keyword,
      id: vertex._id.toString(),
    }));

    const recordId = (await this.meetingService.findOne(meetingId)).record;
    const recordingResponseDto: RecordingResponseDto = await this.recordService.getRecording(recordId);
    this.appGateway.roomRecord[room] = {
      recordingId: recordingResponseDto.id,
      createdAt: recordingResponseDto.createdAt,
    };

    console.log(`Create New Meeting Completed: ${room}: ${this.appGateway.roomMeetingMap[room]}`);
    this.logger.log('Create Room Method: Complete');

    return true;
  }

  public async joinRoom(room: string, password: string): Promise<boolean> {
    if (!this.appGateway.roomMeetingMap[room]) throw new RoomNotFoundException(`${room} is not existing room`);

    if (this.appGateway.roomPasswordManager[room] != password)
      throw new InvalidPasswordException('Password is not valid');

    return true;
  }
}
