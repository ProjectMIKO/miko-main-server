import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from '../gateway/app.gateway';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('favicon.ico')
  sendFavicon(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', '..', 'asset', 'public', 'favicon', 'favicon.ico'));
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
