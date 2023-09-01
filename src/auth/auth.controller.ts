import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards,Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto, SigninDto } from "./models";
import { Tokens } from "./types";
import { AuthGuard } from "@nestjs/passport";
import {Request} from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    // @HttpCode(HttpStatus.OK)
    // @Post('signup')
    // async signup(@Body() dto: SignupDto) {
    //     return (await this.authService.signup(dto));
    // }

    // @HttpCode(HttpStatus.OK)
    // @Post('signin')
    // async signin(@Body() dto: SigninDto) {
    //     return await this.authService.signin(dto);
    // }

    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() dto: SignupDto): Promise<Tokens> {
        return this.authService.signupLocal(dto);
    }

    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto: SigninDto): Promise<Tokens> {
        return this.authService.signinLocal(dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Req() req:Request) {
        const user=req.user;
        return await this.authService.logout(user['sub']);
    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens() {
        // this.authService.refreshTokens();
    }
}