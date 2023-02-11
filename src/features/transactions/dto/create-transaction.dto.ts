import { IsInt, IsMongoId, Min } from 'class-validator';


export class CreateTransactionDto {
	@IsMongoId({message: 'userId must be an id'})
	userId: string;

	@IsInt()
	@Min(1)
	amount: number;
}