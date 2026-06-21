import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { UserRole } from '../../common/types';
import { CreateUserDto } from '../../common/dtos';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getAuthUser(email);
    if (!user) throw new UnauthorizedException('invalid credentials');
    const isPassMatch = await argon2.verify(user.password, password);
    if (!isPassMatch) throw new UnauthorizedException('invalid credentials');
    return user;
  }

  async register(dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return this.login({ id: user.id, role: user.role });
  }
  async login(user: { id: string; role: UserRole }) {
    return await this.assignAccessToken(user);
  }

  logout(user: { id: string; role: UserRole }) {
    return 'logout logic placeholder';
  }

  async assignAccessToken(payload: {
    id: string;
    role: UserRole;
  }): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRY'),
    });
  }
}
