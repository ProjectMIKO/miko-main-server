import { Module } from '@nestjs/common';
import { OpenviduService } from './service/openvidu.service';
import { OpenviduController } from './controller/openvidu.controller';

@Module({
    providers: [OpenviduService],
    controllers: [OpenviduController],
})
export class OpenviduModule {}
