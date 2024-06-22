import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { MeetingService } from '../../meeting/service/meeting.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello MIKO!';
  }
}

@WebSocketGateway({
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true,
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor() {
    instrument(this.server, {
      // Todo: socket.io/admin-ui 인증
      auth: false,
    });
  }

  handleConnection(socket: Socket) {
    socket['nickname'] = 'MIKOUser' + Math.floor(100 + Math.random() * 900);
    this.server.emit('room_change', this.rooms);
  }

  handleDisconnect(client: Socket) {
    // Todo: 유저 접속 종료시 로직 추가
  }

  @SubscribeMessage('enter_room')
  handleEnterRoom(client: Socket, [roomName, done]: [string, Function]) {
    const isNewRoom = !this.rooms().includes(roomName);

    client.join(roomName);
    client.emit('entered_room');

    if(isNewRoom){
      MeetingService.createNewMeeting();
    }

    client
      .to(roomName)
      .emit('welcome', client['nickname'], this.countMember(roomName));
  }

  @SubscribeMessage('disconnecting')
  handleDisconnecting(client: Socket, reason: string) {
    client.rooms.forEach((room) =>
      client
        .to(room)
        .emit('exit', client['nickname'], this.countMember(room) - 1),
    );
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, [msg, room, done]: [string, string, Function]) {
    client.to(room).emit('message', `${client['nickname']}: ${msg}`);
    done();
  }

  @SubscribeMessage('nickname')
  handleNickname(client: Socket, nickname: string) {
    client['nickname'] = nickname;
  }

  private rooms(): string[] {
    const { sids, rooms } = this.server.sockets.adapter;
    const publicRooms: string[] = [];
    rooms.forEach((_, key) => {
      if (!sids.has(key)) {
        publicRooms.push(key);
      }
    });
    return publicRooms;
  }

  private countMember(roomName: string): number {
    return this.server.sockets.adapter.rooms.get(roomName)?.size ?? 0;
  }
}
