import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vertex, VertexDocument } from '@schema/vertex.schema';
import { Model } from 'mongoose';
import { VertexCreateDto } from '@dto/vertex.create.dto';

@Injectable()
export class VertexService {
  constructor(@InjectModel(Vertex.name) private nodeModel: Model<VertexDocument>) {}

  public async createNewNode(nodeCreateDto: VertexCreateDto) {

  }
}
