import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decarator'
import { CurrentUser } from './decorators/user.decorator'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}
	// current channel user
	@Get('by-id/:id')
	async getUser(@Param('id') id: string) {
		return this.userService.byId(+id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
		return this.userService.updateProfile(+id, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('subscribe/:channelId')
	@Auth()
	async subscribeToChannel(
		@CurrentUser('id') id: number,
		@Param('channelId') channelId: string
	) {
		return this.userService.subscribe(id, +channelId)
	}

	@Get()
	async getUsers() {
		return this.userService.getAll()
	}
}
