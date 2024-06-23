import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '@service/auth.service';
import { AuthLocalConfig } from '@auth/config/auth.local.config';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthLocalConfig)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
