import { Injectable } from '@nestjs/common';
import { UserRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    console.log('service', authCredentialsDto);
    return this.userRepository.createUser(authCredentialsDto);
  }
}
