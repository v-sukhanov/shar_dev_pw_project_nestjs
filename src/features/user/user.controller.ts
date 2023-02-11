import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

	constructor(
		private readonly _userService: UserService
	) {
	}

	@UseGuards(JwtAuthGuard)
	@Get('info')
	getUserInfo(@Request() req) {
		return this._userService.getUserInfo(req.user.userId);
	}
}