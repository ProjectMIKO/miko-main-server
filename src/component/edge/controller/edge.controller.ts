import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EdgeService } from '@service/edge.service';
import { EdgeRequestDto } from '@dto/edge.create.dto';

@Controller('edge')
export class EdgeController {
  constructor(private readonly edgeService: EdgeService) {}
}
