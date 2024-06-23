import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from '../gateway/app.gateway';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
