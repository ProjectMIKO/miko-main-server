import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SummarizeRequestDto } from '../dto/summarize.request.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SummarizeResponseDto } from '../dto/summarize.response.dto';
import { ConvertResponseDto } from '../dto/convert.response.dto';
import * as FormData from 'form-data';
import { InvalidMiddlewareException } from '@nestjs/core/errors/exceptions/invalid-middleware.exception';
import { MomResponseDto } from '@middleware/dto/mom.response.dto';
import { MomRequestDto } from '@middleware/dto/mom.request.dto';
import { Conversation } from 'components/conversation/schema/conversation.schema';
import { Vertex } from 'components/vertex/schema/vertex.schema';

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
        };
        return convertResponseDto;
      })
      .catch((error) => {
        throw new InvalidMiddlewareException(`ConvertStt: ${error.message}`);
      });
  }

  public async extractMom(conversations: Conversation[], vertexes: Vertex[]): Promise<MomResponseDto> {
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
        const momResponseDto = new MomResponseDto();
        momResponseDto.mom = responseData.mom;
        return momResponseDto;
      })
      .catch((error) => {
        throw new InternalServerErrorException(`SummarizeScript: ${error.message}`);
      });
  }
}
