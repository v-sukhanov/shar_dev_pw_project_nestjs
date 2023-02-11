import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserScheme } from '../../shared/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import process from 'process';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	controllers: [
		AuthController
	],
	imports: [
		JwtModule.register({
			secret: 'SUPER_SECRET_WORDS',
			signOptions: { expiresIn: '2h' },
		}),
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserScheme
			}
		])
	],
	providers: [
		AuthService,
		JwtStrategy
	]
})
export class AuthModule {

}