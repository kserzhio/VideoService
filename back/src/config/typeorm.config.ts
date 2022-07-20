import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getTypeOrmConfig = async (
	configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: configService.get('POSTGRES_HOST'),
	port: configService.get('PORT'),
	database: configService.get('DATABASE'),
	username: configService.get('USER_NAME'),
	password: configService.get('PASSWORD'),
	autoLoadEntities: true,
	synchronize: true
})
