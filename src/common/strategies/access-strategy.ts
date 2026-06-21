import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from '../types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });
  }
  validate(payload: { id: string; role: UserRole }) {
    return { id: payload.id, role: payload.role };
  }
}
