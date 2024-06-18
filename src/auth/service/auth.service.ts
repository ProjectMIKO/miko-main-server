import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/service/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string, pass: string): Promise<any> {
    const user = await this.userService.checkId(id);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return this.userService.findById(id);
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.id, sub: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
