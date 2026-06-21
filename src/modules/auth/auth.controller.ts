import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from '../../common/guards/local.guard';
import { AccessGuard } from '../../common/guards/access.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../common/types';
import { CreateUserDto } from '../../common/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@CurrentUser() user: { id: string; role: UserRole }) {
    return await this.authService.login(user);
  }

  @Post('logout')
  @UseGuards(AccessGuard)
  logout(@CurrentUser() user: { id: string; role: UserRole }) {
    return this.authService.logout(user);
  }
}
