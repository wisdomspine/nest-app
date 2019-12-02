import { Controller, Get, Post, UseGuards, Req, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post("auth/login")
  async login(@Req() req){
    return this.authService.login(req.user);
  }

  @Get("")
  async home(@Request() req): Promise<any>{
    return req.user;
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  async getProfile(@Req() req): Promise<any>{
    return req.user;
  }
}
