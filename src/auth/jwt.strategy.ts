import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  
      ignoreExpiration: false, 
      secretOrKey: process.env.SECRET_KEY || 'fallback_secret_key',  
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.sub || !payload.email) {
      throw new UnauthorizedException('Token invalid');
    }
    return { id: payload.sub, email: payload.email };  
  }
}
