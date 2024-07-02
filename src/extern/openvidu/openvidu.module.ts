import { Module } from '@nestjs/common';
import { OpenviduService } from '@openvidu/service/openvidu.service';
import { OpenviduController } from '@openvidu/controller/openvidu.controller';
import { RecordService } from '@openvidu/service/record.service';

@Module({
    providers: [OpenviduService, RecordService],
    controllers: [OpenviduController],
    exports: [OpenviduService, RecordService]
})
export class OpenviduModule {}
