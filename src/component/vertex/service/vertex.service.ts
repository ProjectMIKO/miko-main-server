import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vertex, VertexDocument } from '@schema/vertex.schema';
import { Model } from 'mongoose';
import { VertexCreateDto } from '@dto/vertex.create.dto';

@Injectable()
export class VertexService {
  constructor(
    @InjectModel(Vertex.name) private vertexModel: Model<VertexDocument>,
  ) {}

  public async createNewVertex(
    vertexCreateDto: VertexCreateDto,
  ): Promise<string> {
    const vertexModel = new this.vertexModel(vertexCreateDto);
    await vertexModel.save();

    console.log('CreateNewVertex ID: ' + vertexModel._id.toString());

    return vertexModel._id.toString();
  }
}
