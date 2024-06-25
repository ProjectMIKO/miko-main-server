import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService, AppGateway } from './gateway/app.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from '@global/config/mongoose.config';
import { AuthModule } from '@auth/auth.module';
import { OpenviduModule } from '@openvidu/openvidu.module';
import { MiddlewareModule } from '@middleware/middleware.module';
import { S3Module } from '@s3/s3.module';
import { MeetingModule } from '@meeting/meeting.module';
import { ComponentModule } from '@component/component.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionsFilter } from '@global/filter/global.exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    OpenviduModule,
    MiddlewareModule,
    S3Module,
    MeetingModule,
    ComponentModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway, { provide: APP_FILTER, useClass: GlobalExceptionsFilter }],
})
export class AppModule {}
