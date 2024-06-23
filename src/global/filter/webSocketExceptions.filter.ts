import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { InvalidMiddlewareException } from '@nestjs/core/errors/exceptions/invalid-middleware.exception';
import { InvalidResponseException } from '../exception/invalidResponse.exception';
import { FileNotFoundException } from '../exception/findNotFound.exception';

@Catch()
export class WebSocketExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();
    let message = 'Internal server error';

    switch (exception.constructor) {
      case FileNotFoundException:
        message = `ERROR#001: ${(exception as FileNotFoundException).message}`;
        break;
      case InvalidMiddlewareException:
        message = `ERROR#002: ${(exception as InvalidMiddlewareException).name} failed`;
        break;
      case InvalidResponseException:
        message = `ERROR#003: ${(exception as InvalidResponseException).message} failed`;
        break;
    }

    console.error(`${exception.constructor}: ${message}`);
    client.emit('error', `${exception.constructor}: ${message}`);
  }
}
