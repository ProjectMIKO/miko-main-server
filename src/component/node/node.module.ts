import { Module } from '@nestjs/common';
import { NodeService } from './service/node.service';
import { NodeController } from './controller/node.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Node, NodeSchema } from '@schema/node.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }])],
  controllers: [NodeController],
  providers: [NodeService],
  exports: [NodeService],
})
export class NodeModule {}
