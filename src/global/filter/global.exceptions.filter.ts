import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { InvalidMiddlewareException } from '@nestjs/core/errors/exceptions/invalid-middleware.exception';
import { InvalidResponseException } from '../exception/invalidResponse.exception';
import { FileNotFoundException } from '../exception/findNotFound.exception';
import { EmptyDataWarning } from '@global/warning/emptyData.warning';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();
    let message = 'Error#000(InternalServerError)';

    switch (exception.constructor) {
      case FileNotFoundException:
        message = `Error#001(FileNotFoundException): ${(exception as FileNotFoundException).message}`;
        break;
      case InvalidMiddlewareException: // Middleware Error
        const response = (exception as InvalidMiddlewareException).message.match(/\((.*?)\)/)[1];
        message = `Error#002(InvalidMiddlewareException): ${response}`;
        break;
      case InvalidResponseException: // Invalid DB Response
        message = `Error#003(InvalidResponseException): ${(exception as InvalidResponseException).message}`;
        break;
      case EmptyDataWarning:
        message = `Warning#001(EmptyDataException): ${(exception as EmptyDataWarning).message}`;
        break;
    }

    console.error(`${message}`);
    client.emit('error', `${message}`);
  }
}
