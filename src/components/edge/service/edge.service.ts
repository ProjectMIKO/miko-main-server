import { Injectable, NotFoundException } from '@nestjs/common';
import { EdgeEditDto } from '../dto/edge.edit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Edge, EdgeDocument } from '../schema/edge.schema';
import { EdgeRequestDto } from 'components/edge/dto/edge.request.dto';

@Injectable()
export class EdgeService {
  constructor(@InjectModel(Edge.name) private edgeModel: Model<EdgeDocument>) {}

  public async createEdge(vertex1: string, vertex2: string): Promise<string> {
    const edgeModel = new this.edgeModel(vertex1, vertex2);
    await edgeModel.save();

    console.log('CreateEdge ID: ' + edgeModel._id.toString());

    return edgeModel._id.toString();
  }

  public async deleteEdge(vertex1: string, vertex2: string): Promise<string> {
    const deletedEdge = await this.edgeModel.findOneAndDelete({
      $or: [
        { vertex1: vertex1, vertex2: vertex2 },
        { vertex1: vertex2, vertex2: vertex1 },
      ],
    });

    if (!deletedEdge) {
      throw new NotFoundException('Edge not found');
    }

    console.log('DeleteEdge: Success');

    return deletedEdge._id.toString();
  }

  async updateEdge(edgeRequestDto: EdgeEditDto) {
    if (edgeRequestDto.action === '$push') return this.createEdge(edgeRequestDto.vertex1, edgeRequestDto.vertex2);
    else return this.deleteEdge(edgeRequestDto.vertex1, edgeRequestDto.vertex2);
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
