import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppGateway } from './gateway/app.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from 'assets/global/config/mongoose.config';
import { AuthModule } from '@auth/auth.module';
import { OpenviduModule } from '@openvidu/openvidu.module';
import { MiddlewareModule } from '@middleware/middleware.module';
import { S3Module } from '@s3/s3.module';
import { MeetingModule } from 'components/meeting/meeting.module';
import { ComponentModule } from 'components/component.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionsFilter } from 'assets/global/filter/global.exceptions.filter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppService } from './service/app.service';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'asset', 'public', 'favicon'),
      serveRoot: '/',
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
