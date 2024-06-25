import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../service/s3.service';
import { Express } from 'express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DownloadResponseDto } from '../dto/download.response.dto';
import { FileSystemRequestDto } from '../dto/fileSystem.request.dto';
import { UploadResponseDto } from '../dto/upload.response.dto';

@ApiTags('file')
@Controller('/api/file')
export class S3Controller {
  constructor(private readonly fileSystemService: S3Service) {}

  @Post('upload')
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
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadResponseDto> {
    return await this.fileSystemService.uploadFile(file);
  }

  @Get('download')
  @ApiBody({ type: FileSystemRequestDto })
  @ApiResponse({
    status: 200,
    description: 'The file download URL has been successfully generated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async downloadFile(
    @Body() downloadRequestDto: FileSystemRequestDto,
  ): Promise<DownloadResponseDto> {
    return await this.fileSystemService.downloadFile(downloadRequestDto.key);
  }

  @Delete('delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({ type: FileSystemRequestDto })
  @ApiResponse({
    status: 204,
    description: 'The file has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async deleteFile(
    @Body() filesystemRequestDto: FileSystemRequestDto,
  ): Promise<void> {
    await this.fileSystemService.deleteFile(filesystemRequestDto.key);
  }
}
