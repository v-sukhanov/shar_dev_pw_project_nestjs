import { ITransactionUserDto } from './transaction-user.dto';

export interface ITransactionDto {
  id: string;
  created: Date;
  amount: number;
  senderUser: ITransactionUserDto;
  recipientUser: ITransactionUserDto;
}
