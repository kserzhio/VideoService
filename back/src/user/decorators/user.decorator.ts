import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserEntity } from '../user.entity'

export const CurrentUser = createParamDecorator(
    // ctx: ExecutionContex is the current application context to receive the current request
	(data: keyof UserEntity, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user

		return data ? user[data] : user
	}
)
