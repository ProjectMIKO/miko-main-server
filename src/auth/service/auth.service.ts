import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/service/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.checkUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.userService.findByUsername(username);
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.nickname, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
