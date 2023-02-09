import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserScheme } from '../../shared/schemas/user.schema';

@Module({
	controllers: [
		AuthController
	],
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserScheme
			}
		])
	],
	providers: [
		AuthService
	]
})
export class AuthModule {

}