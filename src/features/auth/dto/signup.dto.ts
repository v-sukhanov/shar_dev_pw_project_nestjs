import { IsAlphanumeric, IsEmail, MaxLength, MinLength } from 'class-validator';
import { Match } from '../../../shared/decoraters/match.decorator';


export class SignupDto {
	@IsEmail()
	email: string;

	@MinLength(2)
	@MaxLength(10)
	@IsAlphanumeric()
	name: string;

	@MinLength(6)
	@IsAlphanumeric()
	password: string;

	@Match('password', {
		message: 'The passwords doesn\'t equal'
	})
	confirmPassword: string;
}