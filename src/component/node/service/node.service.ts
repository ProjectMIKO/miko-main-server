import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Node, NodeDocument } from '@schema/node.schema';
import { Model } from 'mongoose';
import { NodeCreateDto } from '@dto/node.create.dto';

@Injectable()
export class NodeService {
  constructor(@InjectModel(Node.name) private nodeModel: Model<NodeDocument>) {}

  public async createNewNode(nodeCreateDto: NodeCreateDto) {

  }
}
