import { Injectable, UseFilters } from '@nestjs/common';
import { SummarizeRequestDto } from '@dto/summarize.request.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SummarizeResponseDto } from '@dto/summarize.response.dto';
import { ConvertResponseDto } from '@dto/convert.response.dto';
import * as FormData from 'form-data';
import { InvalidResponseException } from '@global/exception/invalidResponse.exception';
import { WebSocketExceptionsFilter } from '@global/filter/webSocketExceptions.filter'; // 전체 모듈을 가져옵니다.

@Injectable()
@UseFilters(new WebSocketExceptionsFilter())
export class MiddlewareService {
  private NLP_SERVER_URL: string;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.NLP_SERVER_URL = this.configService.get<string>('NLP_SERVER_URL');
  }

  public async summarizeScript(
    summarizeRequestDto: SummarizeRequestDto,
  ): Promise<SummarizeResponseDto> {
    try {
      const response = await axios.post(
        `${this.NLP_SERVER_URL}/api/keyword/`,
        summarizeRequestDto,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return {
        keyword: response.data.keyword,
        subtitle: response.data.subtitle,
        cost: response.data.cost,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // AxiosError 처리
        throw new InvalidResponseException(
          `Error occurred while summarizing script: ${error.message}`,
        );
      } else {
        // 일반 에러 처리
        throw new InvalidResponseException(
          `An unexpected error occurred: ${error.message}`,
        );
      }
    }
  }

  public async convertStt(
    file: Express.Multer.File,
  ): Promise<ConvertResponseDto> {
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
          script: responseData.text,
        };
        return convertResponse;
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
