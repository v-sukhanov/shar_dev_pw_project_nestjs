
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import {createHmac, randomBytes} from 'crypto';

export type UserDocument = User & Document

@Schema()
export class User {
	@Prop() email: string;
	@Prop() name: string;
	@Prop() salt: string;
	@Prop() hashedPassword: string
	@Prop() created: Date;
	@Prop() balance: number;

}

export const UserScheme = SchemaFactory.createForClass(User)

UserScheme.methods.encryptPassword = function(password) {
	return createHmac('sha1', this.salt).update(password).digest('hex');
};
UserScheme.methods.checkPassword = function(password) {
	return this.encryptPassword(password) === this.hashedPassword;
};

UserScheme.virtual('userId')
	.get(function () {
		return this._id;
	})


UserScheme.virtual('password')
	.set(function (password) {
		this.salt = randomBytes(32).toString('base64');
		//@ts-ignore
		this.hashedPassword = this.encryptPassword(password);
	})
