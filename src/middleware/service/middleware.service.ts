import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SummarizeRequestDto } from '../dto/summarize.request.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SummarizeResponseDto } from '../dto/summarize.response.dto';
import { ConvertResponseDto } from '../dto/convert.response.dto';
import * as FormData from 'form-data';
import { InvalidMiddlewareException } from '@nestjs/core/errors/exceptions/invalid-middleware.exception';
import { MomRequestDto } from '@middleware/dto/mom.request.dto';
import { Conversation } from 'components/conversation/schema/conversation.schema';
import { Vertex } from 'components/vertex/schema/vertex.schema';
import { MeetingFindResponseDto } from 'components/meeting/dto/meeting.find.response.dto';

@Injectable()
export class MiddlewareService {
  private NLP_SERVER_URL: string;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.NLP_SERVER_URL = this.configService.get<string>('NLP_SERVER_URL');
  }

  public async summarizeScript(summarizeRequestDto: SummarizeRequestDto): Promise<SummarizeResponseDto> {
    return axios
      .post(`${this.NLP_SERVER_URL}/api/keyword/`, summarizeRequestDto, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const responseData = response.data;
        const summarizeResponseDto: SummarizeResponseDto = {
          idea: responseData.idea,
        };
        return summarizeResponseDto;
      })
      .catch((error) => {
        throw new InvalidMiddlewareException(`SummarizeScript: ${error.message}`);
      });
  }

  public async convertStt(file: Blob): Promise<ConvertResponseDto> {
    const formData = new FormData();
    formData.append('file', file, 'temp.wav'); // Blob을 그대로 추가

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
          code: 200,
          message: '',
        };
        return convertResponseDto;
      })
      .catch((error) => {
        if (error.response && error.response.status === 429) {
          const convertResponseDto: ConvertResponseDto = {
            script: '',
            code: 429,
            message: 'STT 서비스가 현재 과부하 상태입니다. 잠시 후 다시 시도해주세요.',
          };
          return convertResponseDto;
        }
        throw new InvalidMiddlewareException(`ConvertStt: ${error.message}`);
      });
  }

  public async extractMom(conversations: Conversation[], vertexes: Vertex[]): Promise<MeetingFindResponseDto> {
    const momRequestDto: MomRequestDto = {
      conversations: conversations,
      vertexes: vertexes,
    };

    return axios
      .post(`${this.NLP_SERVER_URL}/api/mom/`, momRequestDto, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const responseData = response.data;
        const meetingFindResponseDto = new MeetingFindResponseDto();
        meetingFindResponseDto.mom = responseData.mom;
        return meetingFindResponseDto;
      })
      .catch((error) => {
        throw new InvalidMiddlewareException(`extractMom: ${error.message}`);
      });
  }
}
