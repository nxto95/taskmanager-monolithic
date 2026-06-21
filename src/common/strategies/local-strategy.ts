import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../modules/auth/auth.service';
import { UserRole } from '../types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<{
    id: string;
    role: UserRole;
  }> {
    const user = await this.authService.validateUser(email, password);
    return {
      id: user.id,
      role: user.role,
    };
  }
}
