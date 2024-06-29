import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vertex, VertexDocument } from '../schema/vertex.schema';
import { Model } from 'mongoose';
import { VertexCreateRequestDto } from '../dto/vertex.create.request.dto';
import { VertexRequestDto } from 'components/vertex/dto/vertex.request.dto';
import { VertexCreateResponseDto } from '../dto/vertex.create.response.dto';

@Injectable()
export class VertexService {
  constructor(@InjectModel(Vertex.name) private vertexModel: Model<VertexDocument>) {}

  public async createVertex(vertexCreateRequestDto: VertexCreateRequestDto): Promise<VertexCreateResponseDto> {
    const vertexModel = new this.vertexModel(vertexCreateRequestDto);
    await vertexModel.save();

    console.log('CreateNewVertex ID: ' + vertexModel._id.toString());

    const vertexCreateResponseDto = new VertexCreateResponseDto(vertexModel._id.toString(), vertexCreateRequestDto);

    return vertexCreateResponseDto;
  }

  public async findVertexes(vertexIdList: Vertex[]): Promise<Vertex[]> {
    const vertexes = await this.vertexModel
      .find({
        _id: {
          $in: vertexIdList,
        },
      })
      .exec();

    if (vertexes.length === 0) throw new NotFoundException('Vertexes not found');

    return vertexes;
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
