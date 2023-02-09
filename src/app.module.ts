import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
	imports: [
		AuthModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
