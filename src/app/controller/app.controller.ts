import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from '../service/app.service';
import { join } from 'path';
import { RoomCreateDto } from '../dto/room.create.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('favicon.ico')
  sendFavicon(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', '..', 'assets', 'public', 'favicon', 'favicon.ico'));
  }

  @Post('create/room')
  createRoom(@Body() roomCreateDto: RoomCreateDto) {
    const { nickname, room, password } = roomCreateDto;
    return this.appService.createNewRoom(nickname, room, password);
  }
}
