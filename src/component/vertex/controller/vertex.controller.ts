import { Controller } from '@nestjs/common';
import { VertexService } from '@service/vertex.service';

@Controller('node')
export class VertexController {
  constructor(private readonly nodeService: VertexService) {}
}
