import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../shared/schemas/user.schema';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private _userModel: Model<UserDocument>
	) {
	}


	async signUp(dto: SignupDto) {
		const existsUser = await this._userModel.findOne({email: dto.email})
		if (existsUser) {
			throw new HttpException('The user already exists', HttpStatus.CONFLICT)
		}
		const newUser = new this._userModel({
			name: dto.name,
			email: dto.email,
			password: dto.password
		});
		await newUser.save()
		return null;
	}
}