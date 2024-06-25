import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vertex, VertexDocument } from '../schema/vertex.schema';
import { Model } from 'mongoose';
import { VertexCreateDto } from '../dto/vertex.create.dto';
import { VertexRequestDto } from 'components/vertex/dto/vertex.request.dto';

@Injectable()
export class VertexService {
  constructor(@InjectModel(Vertex.name) private vertexModel: Model<VertexDocument>) {}

  public async createVertex(vertexCreateDto: VertexCreateDto): Promise<string> {
    const vertexModel = new this.vertexModel(vertexCreateDto);
    await vertexModel.save();

    console.log('CreateNewVertex ID: ' + vertexModel._id.toString());

    return vertexModel._id.toString();
  }

  public async findVertices(vertexRequestDto: VertexRequestDto): Promise<Vertex[]> {
    const { vertexIdList } = vertexRequestDto;

    const vertices = await this.vertexModel
      .find({
        _id: {
          $in: vertexIdList,
        },
      })
      .exec();

    if (vertices.length === 0) throw new NotFoundException('Vertexes not found');

    return vertices;
  }

  public async deleteVertices(vertexRequestDto: VertexRequestDto): Promise<{ deletedCount: number }> {
    const { vertexIdList } = vertexRequestDto;

    const result = await this.vertexModel
      .deleteMany({
        _id: {
          $in: vertexIdList,
        },
      })
      .exec();

    if (result.deletedCount === 0) throw new NotFoundException('No vertexes were deleted');

    return { deletedCount: result.deletedCount };
  }
}
