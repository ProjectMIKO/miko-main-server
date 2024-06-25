import { Module } from '@nestjs/common';
import { S3Service } from './service/s3.service';
import { S3Controller } from './controller/s3.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [S3Controller],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
