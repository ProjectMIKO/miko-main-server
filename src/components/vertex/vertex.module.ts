import { Module } from '@nestjs/common';
import { VertexService } from './service/vertex.service';
import { VertexController } from './controller/vertex.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vertex, VertexSchema } from './schema/vertex.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Vertex.name, schema: VertexSchema }])],
  controllers: [VertexController],
  providers: [VertexService],
  exports: [VertexService],
})
export class VertexModule {}
