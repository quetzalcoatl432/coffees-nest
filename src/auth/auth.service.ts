import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDTO, JWTPayload } from './user.interface'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentials: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.signUp(authCredentials)
  }

  async signIn(authCredentials: AuthCredentialsDTO): Promise<{ accessToken: string }> {
    const username = await this.userRepository.signIn(authCredentials)
    if (!username) throw new UnauthorizedException('Invalid credentials')
    const payload: JWTPayload = { username },
      accessToken = await this.jwtService.sign(payload)
    return { accessToken }
  }
}
