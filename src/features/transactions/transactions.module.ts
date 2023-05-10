import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Transaction,
  TransactionScheme,
} from '../../shared/schemas/transaction.schema';
import { User, UserScheme } from '../../shared/schemas/user.schema';

@Module({
  controllers: [TransactionsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserScheme,
      },
      {
        name: Transaction.name,
        schema: TransactionScheme,
      },
    ]),
  ],
  providers: [TransactionsService],
})
export class TransactionsModule {}
