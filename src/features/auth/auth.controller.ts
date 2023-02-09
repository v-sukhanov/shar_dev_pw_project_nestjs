import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

	constructor(
		private readonly _authService: AuthService
	) {
	}

	@Post('signup')
	signUp(@Body() dto: SignupDto) {
		return this._authService.signUp(dto)
	}

	@Post('signin')
	signIn() {
		return 'signin'
	}
}