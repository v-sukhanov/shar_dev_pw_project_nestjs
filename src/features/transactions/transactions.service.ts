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

	async getUserList(userId: string) {
		return (await this._userModel.find({_id: {$ne: userId}}))
			.map(({ _id, email, name }) => ({
				id: _id,
				email,
				name
			}))
	}

	async getTransactionsList(userId: string) {
		return (await this._transactionModel
			.find({$or: [{senderUser: {$eq: userId}}, {recipientUser: {$eq: userId}}]} )
			.populate('senderUser recipientUser')
			.sort({created: -1}))
			.map(x => {
				return {
					id: x._id,
					created: x.created,
					amount: x.amount,
					senderUser: {
						//@ts-ignore
						id: x.senderUser._id,
						name: x.senderUser.name,
						email: x.senderUser.email,
					},
					recipientUser: {
						//@ts-ignore
						id: x.recipientUser._id,
						name: x.recipientUser.name,
						email: x.recipientUser.email,
					},
				}
			})
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
			throw new HttpException('User can\'t s end pw to yourself', HttpStatus.BAD_REQUEST)
		}
		if (amount > senderUser.balance) {
			throw new HttpException('Amount is greater then balance', HttpStatus.BAD_REQUEST)
		}
		senderUser.balance -= amount;
		recipientUser.balance += amount;
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