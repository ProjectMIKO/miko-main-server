import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';
import { AppService } from '../service/app.service';
import { RoomCreateDto } from '../dto/room.create.dto';
import { RoomJoinDto } from '../dto/room.join.dto';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get Hello message' })
  @ApiResponse({
    status: 200,
    description: 'Returns a Hello message.',
    schema: {
      type: 'string',
      example: 'Hello MIKO!',
    },
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Get favicon' })
  @ApiResponse({
    status: 200,
    description: 'Returns the favicon.ico file.',
    content: {
      'image/x-icon': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Get('favicon.ico')
  sendFavicon(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', '..', 'assets', 'public', 'favicon', 'favicon.ico'));
  }

  @ApiOperation({ summary: 'Create a new room' })
  @ApiBody({
    description: 'The data needed to create a new room',
    type: RoomCreateDto,
    examples: {
      example1: {
        summary: 'Example room creation',
        value: {
          nickname: 'User1',
          room: 'Room1',
          password: 'password123',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The room has been successfully created.',
    schema: {
      type: 'boolean',
      example: true,
    },
  })
  @Post('create/room')
  async createRoom(@Body() roomCreateDto: RoomCreateDto): Promise<boolean> {
    const { nickname, room, password, image } = roomCreateDto;
    return await this.appService.createNewRoom(nickname, room, password, image);
  }

  @ApiOperation({ summary: 'Join an existing room' })
  @ApiBody({
    description: 'The data needed to join an existing room',
    type: RoomJoinDto,
    examples: {
      example1: {
        summary: 'Example room join',
        value: {
          room: 'Room1',
          password: 'password123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully joined the room.',
    schema: {
      type: 'boolean',
      example: true,
    },
  })
  @Post('join/room')
  async joinRoom(@Body() roomJoinDto: RoomJoinDto): Promise<boolean> {
    const { room, password } = roomJoinDto;
    return await this.appService.joinRoom(room, password);
  }
}
