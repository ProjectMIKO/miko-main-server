import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EdgeEditRequestDto } from '../dto/edge.edit.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Edge, EdgeDocument } from '../schema/edge.schema';
import { EdgeRequestDto } from 'components/edge/dto/edge.request.dto';
import { EdgeEditReponseDto } from '../dto/edge.edit.response.dto';

@Injectable()
export class EdgeService {
  constructor(@InjectModel(Edge.name) private edgeModel: Model<EdgeDocument>) {}

  public async createEdge(vertex1: string, vertex2: string): Promise<string> {
    const edgeModel = new this.edgeModel({ vertex1, vertex2 });
    await edgeModel.save();

    if (!edgeModel) throw new NotFoundException('Edge not found');
    console.log('CreateEdge ID: ' + edgeModel._id.toString());

    return edgeModel._id.toString();
  }

  async deleteEdge(vertex1: string, vertex2: string): Promise<string> {
    const edgeModel = await this.edgeModel.findOneAndDelete({
      $or: [
        { vertex1: vertex1, vertex2: vertex2 },
        { vertex1: vertex2, vertex2: vertex1 },
      ],
    });

    if (!edgeModel) throw new NotFoundException('Edge not found');
    console.log('DeletedEdge ID: ' + edgeModel._id.toString());

    return edgeModel._id.toString();
  }

  public async updateEdge(edgeEditRequestDto: EdgeEditRequestDto): Promise<EdgeEditReponseDto> {
    const contentId =
      edgeEditRequestDto.action === '$push'
        ? await this.createEdge(edgeEditRequestDto.vertex1, edgeEditRequestDto.vertex2)
        : await this.deleteEdge(edgeEditRequestDto.vertex1, edgeEditRequestDto.vertex2);

    const edgeEditReponseDto = new EdgeEditReponseDto(contentId, edgeEditRequestDto);

    return edgeEditReponseDto;
  }

  public async findEdges(edgeRequestDto: EdgeRequestDto): Promise<Edge[]> {
    const { edgeIdList } = edgeRequestDto;

    const edges = await this.edgeModel
      .find({
        _id: {
          $in: edgeIdList,
        },
      })
      .exec();

    if (edges.length === 0) throw new NotFoundException('Edges not found');

    return edges;
  }

  public async deleteEdges(edgeRequestDto: EdgeRequestDto): Promise<{ deletedCount: number }> {
    const { edgeIdList } = edgeRequestDto;

    const result = await this.edgeModel
      .deleteMany({
        _id: {
          $in: edgeIdList,
        },
      })
      .exec();

    if (result.deletedCount === 0) throw new NotFoundException('No edges were deleted');

    return { deletedCount: result.deletedCount };
  }
}
