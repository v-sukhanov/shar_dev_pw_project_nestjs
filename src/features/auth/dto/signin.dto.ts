import { IsAlphanumeric, IsEmail, MinLength } from 'class-validator';

export class SigninDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsAlphanumeric()
  password: string;
}
