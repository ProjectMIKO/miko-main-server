import { Injectable, NestMiddleware, UseFilters } from '@nestjs/common';
import { SummarizeRequestDto } from '@dto/summarize.request.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SummarizeResponseDto } from '@dto/summarize.response.dto';
import { ConvertResponseDto } from '@dto/convert.response.dto';
import * as FormData from 'form-data';
import { WebSocketExceptionsFilter } from '@global/filter/webSocketExceptions.filter';
import { InvalidMiddlewareException } from '@nestjs/core/errors/exceptions/invalid-middleware.exception';
import { NextFunction } from 'express';

@Injectable()
@UseFilters(new WebSocketExceptionsFilter())
export class MiddlewareService implements NestMiddleware {
  private NLP_SERVER_URL: string;

  constructor(private configService: ConfigService) {}

  async use(request: Request, _: Response, next: NextFunction) {
    try {
      next();
    } catch (error) {
      next(error);
    }
  }

  onModuleInit() {
    this.NLP_SERVER_URL = this.configService.get<string>('NLP_SERVER_URL');
  }

  public async summarizeScript(
    summarizeRequestDto: SummarizeRequestDto,
  ): Promise<SummarizeResponseDto> {
    return axios
      .post(`${this.NLP_SERVER_URL}/api/keyword/`, summarizeRequestDto, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const responseData = response.data;
        const summarizeResponseDto: SummarizeResponseDto = {
          keyword: responseData.keyword,
          subtitle: responseData.subtitle,
          cost: responseData.cost,
        };
        return summarizeResponseDto;
      })
      .catch((error) => {
        throw new InvalidMiddlewareException(
          `SummarizeScript: ${error.message}`,
        );
      });
  }

  public async convertStt(
    file: Express.Multer.File,
  ): Promise<ConvertResponseDto> {
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    return axios
      .post(`${this.NLP_SERVER_URL}/api/stt/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const responseData = response.data;
        const convertResponseDto: ConvertResponseDto = {
          script: responseData.text,
        };
        return convertResponseDto;
      })
      .catch((error) => {
        throw new InvalidMiddlewareException(`ConvertStt: ${error.message}`);
      });
  }
}
