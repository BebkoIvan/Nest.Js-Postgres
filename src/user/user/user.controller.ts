import { Controller, Post, Get, Body, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from '../user.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';


@Controller()
export class UserController {

    constructor(private userService: UserService) {}

    @Get('api/users')
    showAllUsers(){
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
