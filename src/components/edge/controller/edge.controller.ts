import { Controller, Get, Body, Delete } from '@nestjs/common';
import { EdgeService } from '../service/edge.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EdgeRequestDto } from 'components/edge/dto/edge.request.dto';
import { Edge } from 'components/edge/schema/edge.schema';

@Controller('edge')
export class EdgeController {
  constructor(private readonly edgeService: EdgeService) {}

  @Get()
  @ApiOperation({ summary: 'Find edges by IDs' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of edges', type: [Edge] })
  @ApiBody({ type: EdgeRequestDto })
  public async findEdges(@Body() edgeRequestDto: EdgeRequestDto) {
    return this.edgeService.findEdges(edgeRequestDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete edges by IDs' })
  @ApiResponse({ status: 200, description: 'Successful deletion of edges' })
  @ApiBody({ type: EdgeRequestDto })
  public async deleteEdges(@Body() edgeRequestDto: EdgeRequestDto) {
    return this.edgeService.deleteEdges(edgeRequestDto);
  }
}
