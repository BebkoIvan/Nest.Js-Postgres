import { Controller, Post, Get, Body, UsePipes, UseGuards, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from '../user.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from '../user.decorator';

@Controller()
export class UserController {

    constructor(private userService: UserService) {}

    @Get('api/users')
    @UseGuards(new AuthGuard())
    showAllUsers(@User('username') username: string){
        Logger.log(username);
        return this.userService.showAll();
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() data: UserDTO) {
        return this.userService.login(data);
    }

    @Post('register')
    register(@Body() data: UserDTO) {
        return this.userService.signUp(data);
    }
}
