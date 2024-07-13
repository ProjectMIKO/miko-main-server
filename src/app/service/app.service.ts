import { InvalidPasswordException } from '@global/exception/invalidPassword.exception';
import { RoomExistException } from '@global/exception/roomExist.exception';
import { RoomNotFoundException } from '@global/exception/roomNotFound.exception';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AppGateway } from 'app/gateway/app.gateway';
import { MeetingCreateDto } from 'components/meeting/dto/meeting.create.dto';
import { Owner } from 'components/meeting/schema/meeting.schema';
import { MeetingService } from 'components/meeting/service/meeting.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly meetingService: MeetingService,
    private readonly appGateway: AppGateway,
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

  public async joinRoom(room: string, password: string): Promise<boolean> {
    if (!this.appGateway.roomMeetingMap[room]) throw new RoomNotFoundException(`${room} is not existing room`);

    if (this.appGateway.roomPasswordManager[room] != password)
      throw new InvalidPasswordException('Password is not valid');

    return true;
  }
}
