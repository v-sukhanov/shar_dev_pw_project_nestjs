import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: SignupDto) {
    return await this._authService.signUp(dto);
  }

  @Post('signin')
  async signIn(@Body() dto: SigninDto) {
    return await this._authService.signIn(dto);
  }
}
