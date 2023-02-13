import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { UserModule } from './features/user/user.module';
import { TransactionsModule } from './features/transactions/transactions.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
		AuthModule,
		UserModule,
		TransactionsModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
