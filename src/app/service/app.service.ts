import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AppGateway } from 'app/gateway/app.gateway';
import { MeetingCreateDto } from 'components/meeting/dto/meeting.create.dto';
import { MeetingService } from 'components/meeting/service/meeting.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly meetingService: MeetingService;
  private readonly appGateway: AppGateway;

  public getHello(): string {
    return 'Hello MIKO!';
  }

  /**
   * 새로운 방에 입장했을 때 Session 초기화 및 DB에 meeting 생성. room 이름과 meeting 맵핑하는 메서드
   *
   * @param client - Socket
   * @param room - 방 이름
   */
  public async createNewRoom(nickname: string, room: string, password: string) {
    if (!nickname) throw new BadRequestException('Nickname is empty');
    if (!room) throw new BadRequestException('Room is empty');

    this.logger.log('Create Room Method: Initiated');

    if (this.appGateway.roomMeetingMap[room]) {
      this.logger.warn(`Create Room Method: ${room} is existing room`);
      return false;
    }

    const meetingCreateDto: MeetingCreateDto = {
      title: room,
      owner: nickname,
    };

    this.appGateway.roomMeetingMap[room] = await this.meetingService.createNewMeeting(meetingCreateDto);
    this.appGateway.roomPosswordManager[room] = password;
    this.appGateway.roomHostManager[room] = nickname;
    this.appGateway.roomConversations[room] = {};

    console.log(`Create New Meeting Completed: ${room}: ${this.appGateway.roomMeetingMap[room]}`);
    this.logger.log('Create Room Method: Complete');
  }
}