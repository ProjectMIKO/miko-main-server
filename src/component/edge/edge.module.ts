import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Edge, EdgeSchema } from '@schema/edge.schema';
import { EdgeController } from '@controller/edge.controller';
import { EdgeService } from '@service/edge.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Edge.name, schema: EdgeSchema }])],
  controllers: [EdgeController],
  providers: [EdgeService],
  exports: [EdgeService],
})
export class EdgeModule {}
