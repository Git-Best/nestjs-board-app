import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { UserRepository } from './auth.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      secretOrKey: 'Secret1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRepository.findOneBy({ username });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
