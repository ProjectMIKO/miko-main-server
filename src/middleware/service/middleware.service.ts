import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SummarizeRequestDto } from '../dto/summarize.request.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SummarizeResponseDto } from '../dto/summarize.response.dto';

@Injectable()
export class MiddlewareService {
  private NLP_SERVER_URL: string;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.NLP_SERVER_URL = this.configService.get<string>('NLP_SERVER_URL');
  }
  
  async summarizeText(summarizeRequestDto: SummarizeRequestDto): Promise<SummarizeResponseDto> {
    return axios
      .post(`${this.NLP_SERVER_URL}/keyword`, summarizeRequestDto)
      .then((response) => {
        const responseData = response.data;
        const summarizeResponse: SummarizeResponseDto = {
          keyword: responseData.keyword,
          cost: responseData.cost
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
}
