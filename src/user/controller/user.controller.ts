import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../schema/user.schema';
import { UserCreateDto } from '../dto/user.create.dto';
import { UserResponseDto } from '../dto/user.response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: UserCreateDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
