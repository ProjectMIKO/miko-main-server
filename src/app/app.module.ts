import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService, AppGateway } from './service/app.service';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from '../config/mongoose.config';
import { AuthModule } from '../auth/auth.module';
import { OpenviduModule } from '../openvidu/openvidu.module';
import { MiddlewareModule } from '../middleware/middleware.module';
import { FileSystemModule } from '../filesystem/fileSystem.module';

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
    UserModule,
    AuthModule,
    OpenviduModule,
    MiddlewareModule,
    FileSystemModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
