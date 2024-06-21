import { Module } from '@nestjs/common';
import { MiddlewareService } from './service/middleware.service';
import { MiddlewareController } from './controller/middleware.controller';

@Module({
    providers: [MiddlewareService],
    controllers: [MiddlewareController]
})
export class MiddlewareModule {}
