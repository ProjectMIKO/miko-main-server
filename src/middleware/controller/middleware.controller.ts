import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MiddlewareService } from '@service/middleware.service';
import { SummarizeRequestDto } from '@dto/summarize.request.dto';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SummarizeResponseDto } from '@dto/summarize.response.dto';
import { UploadResponseDto } from '@dto/upload.response.dto';
import { Express } from 'express';
import { ConvertResponseDto } from '@dto/convert.response.dto';

import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('middleware')
@Controller('api/middleware')
export class MiddlewareController {
  constructor(private readonly middlewareService: MiddlewareService) {}

  @Post('summarize')
  @ApiBody({ type: SummarizeRequestDto })
  @ApiResponse({
    status: 200,
    description: 'The summary has been successfully generated.',
    type: SummarizeResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async summarizeText(
    @Body() summarizeRequestDto: SummarizeRequestDto,
  ): Promise<SummarizeResponseDto> {
    return this.middlewareService.summarizeScript(summarizeRequestDto);
  }

  @Post('stt')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Audio file to upload',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The file has been successfully uploaded.',
    type: UploadResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async convertStt(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ConvertResponseDto> {
    return await this.middlewareService.convertStt(file);
  }
}
