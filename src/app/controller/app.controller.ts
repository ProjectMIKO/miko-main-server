import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from '../service/app.service';
import { join } from 'path';
import { RoomCreateDto } from '../dto/room.create.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get Hello message' })
  @ApiResponse({ status: 200, description: 'Return Hello message' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Get favicon' })
  @ApiResponse({ status: 200, description: 'Return favicon.ico' })
  @Get('favicon.ico')
  sendFavicon(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', '..', 'assets', 'public', 'favicon', 'favicon.ico'));
  }

  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({ status: 201, description: 'The room has been successfully created.' })
  @Post('create/room')
  createRoom(@Body() roomCreateDto: RoomCreateDto) {
    const { nickname, room, password } = roomCreateDto;
    return this.appService.createNewRoom(nickname, room, password);
  }
}
