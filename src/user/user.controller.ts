import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from '../auth/decorator/index';
import { User } from './models/user.entity';
@Controller('user')
export class UserController {
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(
        @GetUser() user: User,
    ) {
        return user;
    }

}
