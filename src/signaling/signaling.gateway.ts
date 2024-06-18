import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class SignalingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('SignalingGateway');

  @SubscribeMessage('join')
  handleJoin(client: Socket, room: string): void {
    client.join(room);
    client.to(room).emit('user-joined', client.id);
    this.logger.log(`Client ${client.id} joined room ${room}`);
  }

  @SubscribeMessage('signal')
  handleSignal(client: Socket, payload: { room: string; data: any }): void {
    const { room, data } = payload;
    client.to(room).emit('signal', { id: client.id, data });
    this.logger.log(`Client ${client.id} sent signal to room ${room}`);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
