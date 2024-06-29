import {
  ArgumentsHost,
  BadGatewayException,
  BadRequestException,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { InvalidMiddlewareException } from '@nestjs/core/errors/exceptions/invalid-middleware.exception';
import { InvalidResponseException } from '../exception/invalidResponse.exception';
import { EmptyDataWarning } from 'assets/global/warning/emptyData.warning';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionsFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();
    let status = 'error';
    let message: string;

    console.log('Catched by Global Exceptions Handler');

    switch (exception.constructor) {
      case NotFoundException:
        message = `Error#001(NotFoundException): ${(exception as NotFoundException).message}`;
        break;
      case InvalidMiddlewareException: // Middleware Error
        const response = (exception as InvalidMiddlewareException).message.match(/\((.*?)\)/)[1];
        message = `Error#002(InvalidMiddlewareException): ${response}`;
        break;
      case InvalidResponseException:
        message = `Error#003(InvalidResponseException): ${(exception as InvalidResponseException).message}`;
        break;
      case BadRequestException:
        message = `Error#004(BadRequestException): ${(exception as BadRequestException).message}`;
        break;
      case BadGatewayException:
        message = `Error#005(BadGatewayException): ${(exception as BadGatewayException).message}`;
        break;
      case EmptyDataWarning:
        status = 'warning';
        message = `Warning#001(EmptyDataException): ${(exception as EmptyDataWarning).message}`;
        break;
      default:
        status = 'internal';
        message = `Error#000(InternalServerError): ${exception.message}`;
    }

    if (status == 'error') {
      this.logger.error(message);
      client.emit('error', message);
    } else if (status == 'warning') {
      this.logger.warn(message);
      client.emit('warning', message);
    } else {
      this.logger.error(message);
    }
  }
}
