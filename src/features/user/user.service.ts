import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../shared/schemas/user.schema';
import { Model } from 'mongoose';
import { use } from 'passport';


@Injectable()
export class UserService {

	constructor(
		@InjectModel(User.name) private _userModel: Model<UserDocument>
	) {
	}

	async getUserInfo(id: string) {
		const user = await this._userModel.findById(id)
		if (!user) {
			throw new HttpException('The user not found', HttpStatus.BAD_REQUEST)
		}
		return {
			id: user._id,
			email: user.email,
			name: user.name,
			balance: user.balance
		}
	}
}