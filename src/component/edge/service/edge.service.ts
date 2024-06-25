import { Injectable, NotFoundException } from '@nestjs/common';
import { EdgeRequestDto } from '../dto/edge.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Edge, EdgeDocument } from '../schema/edge.schema';

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

  async updateEdge(edgeRequestDto: EdgeRequestDto) {
    if (edgeRequestDto.action === '$push')
      return this.createEdge(edgeRequestDto.vertex1, edgeRequestDto.vertex2);
    else return this.deleteEdge(edgeRequestDto.vertex1, edgeRequestDto.vertex2);
  }
}
