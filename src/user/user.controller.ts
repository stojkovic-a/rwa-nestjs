import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { JwtGuard,RolesGuard } from 'src/auth/guard/index';
import { GetUser,Roles} from '../auth/decorator/index';
import { Role } from 'src/auth/enum/index';
@Controller('user')
export class UserController {

    constructor(private userService:UserService){

    }

    @Get('me')
    getMe(
        @GetUser() user: User,
        ) {
        return user;
    }

    @Get()
    @Roles(Role.Admin,Role.Player)
    public async getAllUsers(){
        return this.userService.getAllUsers();
    }


}
