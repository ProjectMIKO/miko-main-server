import { Body, Controller, Post } from '@nestjs/common';
import { MiddlewareService } from '../service/middleware.service';
import { SummarizeRequestDto } from '../dto/summarize.request.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SummarizeResponseDto } from '../dto/summarize.response.dto';

@ApiTags('middleware')
@Controller('api/middleware')
export class MiddlewareController {
  constructor(private readonly middlewareService: MiddlewareService) {}

  @Post('summarize')
  @ApiBody({ type: SummarizeRequestDto })
  @ApiResponse({
    status: 200,
    description: 'The summary has been successfully generated.',
    type: SummarizeResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async summarizeText(
    @Body() summarizeRequestDto: SummarizeRequestDto,
  ): Promise<SummarizeResponseDto> {
    return await this.middlewareService.summarizeScript(summarizeRequestDto);
  }
}
