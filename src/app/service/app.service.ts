import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';


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
      auth: false,
    });
  }

  handleConnection(socket: Socket) {
    socket['nickname'] = 'Anon';
    this.server.emit('room_change', this.publicRooms());
  }

  handleDisconnect(socket: Socket) {
    this.server.emit('room_change', this.publicRooms());
  }

  @SubscribeMessage('enter_room')
  handleEnterRoom(client: Socket, [roomName, done]: [string, Function]) {
    client.join(roomName);
    done();
    client
      .to(roomName)
      .emit('welcome', client['nickname'], this.countMember(roomName));
    this.server.emit('room_change', this.publicRooms());
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

  private publicRooms(): string[] {
    const { sids, rooms } = this.server.sockets.adapter;
    const publicRooms: string[] = [];
    rooms.forEach((_, key) => {
      if (!sids.get(key)) {
        publicRooms.push(key);
      }
    });
    return publicRooms;
  }

  private countMember(roomName: string): number {
    return this.server.sockets.adapter.rooms.get(roomName)?.size ?? 0;
  }
}
