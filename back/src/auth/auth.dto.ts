import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email: string
	@MinLength(6, {
		message: 'Min Six sybmols'
	})
	@IsString()
	password: string
}
