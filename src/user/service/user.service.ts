import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { UserCreateDto } from '../dto/user.create.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../dto/user.response.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userCreateDto: UserCreateDto): Promise<User> {
    const { username, password } = userCreateDto;

    if (await this.findByUsername(username)) {
      throw new ConflictException('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      ...userCreateDto,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find().exec();

    return users.map((user) => this.toUserResponseDto(user));
  }

  async findByUsername(username: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ username: username }).exec();

    return this.toUserResponseDto(user);
  }

  async checkUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  private toUserResponseDto(user: UserDocument): UserResponseDto {
    const userResponseDto = new UserResponseDto();

    userResponseDto.username = user.username;
    userResponseDto.nickname = user.nickname;
    userResponseDto.role = user.role;
    userResponseDto.isActive = user.isActive;

    return userResponseDto;
  }
}
