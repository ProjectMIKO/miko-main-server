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
import { Request, Response } from 'express';
import { Socket } from 'socket.io';
import { InvalidMiddlewareException } from '@nestjs/core/errors/exceptions/invalid-middleware.exception';
import { InvalidResponseException } from '../exception/invalidResponse.exception';
import { EmptyDataWarning } from 'assets/global/warning/emptyData.warning';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number;
    let status = 'error';
    let message: string;

    console.log('Catched by Global Exceptions Handler');

    switch (exception.constructor) {
      case NotFoundException:
        statusCode = 404;
        message = `Error#001(NotFoundException): ${(exception as NotFoundException).message}`;
        break;
      case InvalidMiddlewareException:
        statusCode = 400;
        const responseMsg = (exception as InvalidMiddlewareException).message.match(/\((.*?)\)/)[1];
        message = `Error#002(InvalidMiddlewareException): ${responseMsg}`;
        break;
      case InvalidResponseException:
        statusCode = 400;
        message = `Error#003(InvalidResponseException): ${(exception as InvalidResponseException).message}`;
        break;
      case BadRequestException:
        statusCode = 400;
        message = `Error#004(BadRequestException): ${(exception as BadRequestException).message}`;
        break;
      case BadGatewayException:
        statusCode = 502;
        message = `Error#005(BadGatewayException): ${(exception as BadGatewayException).message}`;
        break;
      case EmptyDataWarning:
        status = 'warning';
        message = `Warning#001(EmptyDataException): ${(exception as EmptyDataWarning).message}`;
        break;
      default:
        statusCode = 500;
        message = `Error#000(InternalServerError): ${exception.message}`;
    }

    if (host.getType() === 'http') {
      // HTTP 요청 처리
      response.status(statusCode).json({
        statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
    } else if (host.getType() === 'ws') {
      // WebSocket 요청 처리
      const client = host.switchToWs().getClient<Socket>();
      if (status === 'error') {
        this.logger.error(message);
        client.emit('error', message);
      } else if (status === 'warning') {
        this.logger.warn(message);
        client.emit('warning', message);
      } else {
        this.logger.error(message);
      }
    }
  }
}
