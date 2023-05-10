import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { createHmac, randomBytes } from 'crypto';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
  })
  email: string;
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  salt: string;
  @Prop({
    required: true,
  })
  hashedPassword: string;
  @Prop({
    default: Date.now(),
  })
  created: Date;
  @Prop({
    default: 500,
  })
  balance: number;
}

export const UserScheme = SchemaFactory.createForClass(User);

UserScheme.methods.encryptPassword = function (password) {
  return createHmac('sha1', this.salt).update(password).digest('hex');
};
UserScheme.methods.checkPassword = function (password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

UserScheme.virtual('userId').get(function () {
  return this._id;
});

UserScheme.virtual('password').set(function (password) {
  this.salt = randomBytes(32).toString('base64');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.hashedPassword = this.encryptPassword(password);
});
