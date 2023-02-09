import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';


@Controller('auth')
export class AuthController {

	@Post('signup')
	signUp(@Body() dto: SignupDto) {
		return 'signup'
	}

	@Post('signin')
	signIn() {
		return 'signin'
	}
}