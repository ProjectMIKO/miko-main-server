import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SummarizeRequestDto } from '../dto/summarize.request.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SummarizeResponseDto } from '../dto/summarize.response.dto';
import { ConvertResponseDto } from '../dto/convert.response.dto';
import * as FormData from 'form-data'; // 전체 모듈을 가져옵니다.

@Injectable()
export class MiddlewareService {
  private NLP_SERVER_URL: string;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.NLP_SERVER_URL = this.configService.get<string>('NLP_SERVER_URL');
  }

  async summarizeText(
    summarizeRequestDto: SummarizeRequestDto,
  ): Promise<SummarizeResponseDto> {
    return axios
      .post(`${this.NLP_SERVER_URL}/api/keyword/`, summarizeRequestDto)
      .then((response) => {
        const responseData = response.data;
        const summarizeResponse: SummarizeResponseDto = {
          keyword: responseData.keyword,
          subtitle: responseData.subtitle,
          cost: responseData.cost,
        };
        return summarizeResponse;
      })
      .catch((error) => {
        throw new HttpException(
          `Failed to summarize text: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async convertStt(file: Express.Multer.File): Promise<ConvertResponseDto> {
    const formData = new FormData();
    // @ts-ignore
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
        const convertResponse: ConvertResponseDto = {
          text: responseData.text,
        };
        return convertResponse;
      });
  }
}
