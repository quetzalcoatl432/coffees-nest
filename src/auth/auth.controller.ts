import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCredentialsDTO } from './user.interface'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentials: AuthCredentialsDTO): Promise<void> {
    return this.authService.signUp(authCredentials)
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentials: AuthCredentialsDTO): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentials)
  }
}
