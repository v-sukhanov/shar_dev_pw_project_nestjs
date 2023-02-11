import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {

	constructor(
		private readonly _transactionsService: TransactionsService
	) {
	}

	@Get('list')
	getList(@Req() req) {
		return this._transactionsService.getTransactionsList(req.user.userId);
	}

	@Post('create')
	createTransaction(@Req() req, @Body() dto: CreateTransactionDto) {
		return this._transactionsService.createTransaction(req.user.userId, dto);
	}
}