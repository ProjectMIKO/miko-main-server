import { Module } from '@nestjs/common';
import { OpenviduService } from './service/openvidu.service';
import { OpenviduController } from './controller/openvidu.controller';
import { RecordService } from './service/record.service';

@Module({
    providers: [OpenviduService, RecordService],
    controllers: [OpenviduController],
})
export class OpenviduModule {}
