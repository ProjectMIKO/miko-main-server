import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EdgeService } from '@service/edge.service';

@Controller('edge')
export class EdgeController {
  constructor(private readonly edgeService: EdgeService) {}

}
