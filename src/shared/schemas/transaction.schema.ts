import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type TransactionDocument = Transaction & Document

@Schema()
export class Transaction {
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}) senderUser: User;
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}) recipientUser: User;
	@Prop({
		required: true
	}) amount: number;
	@Prop({
		default: Date.now()
	}) created: Date
}

export const TransactionScheme = SchemaFactory.createForClass(Transaction)

