import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../shared/schemas/user.schema';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from '../../shared/schemas/transaction.schema';


@Injectable()
export class TransactionsService {
	constructor(
		@InjectModel(User.name) private _userModel: Model<UserDocument>,
		@InjectModel(Transaction.name) private _transactionModel: Model<TransactionDocument>,

	) {
	}


	async createTransaction(userId: string, dto: CreateTransactionDto) {
		const {amount} = dto;
		const senderUser = await this._userModel.findById(userId)
		const recipientUser = await this._userModel.findById(dto.userId)
		if (!senderUser) {
			throw new HttpException('The sender user not found', HttpStatus.BAD_REQUEST)
		}
		if (!recipientUser) {
			throw new HttpException('The recipient user not found', HttpStatus.BAD_REQUEST)
		}
		if (senderUser.id === recipientUser.id) {
			throw new HttpException('User can\'t send pw to yourself', HttpStatus.BAD_REQUEST)
		}
		if (amount > senderUser.balance) {
			throw new HttpException('Amount is greater then balance', HttpStatus.BAD_REQUEST)
		}
		senderUser.balance -= amount;
		console.log(senderUser, recipientUser)
		const newTransaction = new this._transactionModel({
			senderUser: senderUser,
			recipientUser: recipientUser,
			amount
		})
		await newTransaction.save();
		await senderUser.save();
		await recipientUser.save();
	}
}