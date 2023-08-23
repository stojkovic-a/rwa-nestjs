import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('user')
export class UserController {
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req: Request) {
        console.log("req.user", req.user);
        return req.user;
    }

}
