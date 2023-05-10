import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../shared/schemas/user.schema';
import { SigninDto } from './dto/signin.dto';
import * as process from 'process';
import { ISigninResponseDto } from './dto/signin-response.dto';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private _userModel: Model<UserDocument>,
  ) {}

  async signUp(dto: SignupDto) {
    const existsUser = await this._userModel.findOne({ email: dto.email });
    if (existsUser) {
      throw new HttpException('The user already exists', HttpStatus.CONFLICT);
    }
    const newUser = new this._userModel({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
    await newUser.save();
  }

  async signIn(dto: SigninDto): Promise<ISigninResponseDto> {
    const user = await this._userModel.findOne({ email: dto.email });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!user || !user.checkPassword(dto.password)) {
      throw new HttpException(
        'The email address or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: '2h',
    });
    return {
      token,
    };
  }
}
