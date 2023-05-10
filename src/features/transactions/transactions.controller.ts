import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly _transactionsService: TransactionsService) {}

  @Get('list')
  async getList(@Req() req) {
    return await this._transactionsService.getTransactionsList(req.user.userId);
  }

  @Get('userList')
  async userList(@Req() req) {
    return await this._transactionsService.getUserList(req.user.userId);
  }

  @Post('create')
  async createTransaction(@Req() req, @Body() dto: CreateTransactionDto) {
    return await this._transactionsService.createTransaction(req.user.userId, dto);
  }
}
