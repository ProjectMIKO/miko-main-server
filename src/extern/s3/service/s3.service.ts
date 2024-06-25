import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { UploadResponseDto } from '../dto/upload.response.dto';
import { DownloadResponseDto } from '../dto/download.response.dto';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly bucketName: string;
  private readonly region: string;

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    this.region = this.configService.get<string>('AWS_REGION');
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  public async uploadFile(file: Express.Multer.File): Promise<UploadResponseDto> {
    const key = `${uuidv4()}-${file.originalname}`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.send(new PutObjectCommand(uploadParams));

    return plainToClass(UploadResponseDto, {
      result: true,
      key: key,
    });
  }

  public async downloadFile(key: string): Promise<DownloadResponseDto> {
    const downloadParams = {
      Bucket: this.bucketName,
      Key: key,
    };

    const command = new GetObjectCommand(downloadParams);

    return plainToClass(UploadResponseDto, {
      result: true,
      fileUrl: await getSignedUrl(this.s3, command, { expiresIn: 3600 }),
    });
  }

  public async deleteFile(key: string): Promise<void> {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: key,
    };

    await this.s3.send(new DeleteObjectCommand(deleteParams));
  }
}
