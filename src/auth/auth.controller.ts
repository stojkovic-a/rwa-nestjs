import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards,Req, Get, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto, SigninDto } from "./models";
import { Tokens } from "./types";
import { AuthGuard } from "@nestjs/passport";
import {Request} from 'express';
import { AtGuard, RtGuard } from "./guard";
import { GetCurrentUserId, GetUser, Public } from "./decorator";

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


    @Public()
    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() dto: SignupDto): Promise<Tokens> {
        return this.authService.signupLocal(dto);
    }

    @Public()
    @Get('local/verify/:code')
    @HttpCode(HttpStatus.OK)
    public async verifyEmail(@Param('code') code:string){
        await this.authService.verifyEmail(code);
        return "Account successfully verified!";
    }

    @Public()
    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto: SigninDto): Promise<Tokens> {
        return this.authService.signinLocal(dto);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentUserId() userId:number) {
        return await this.authService.logout(userId);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUserId() userId:number,
        @GetUser('refreshToken') rt:string
    ) {
        return this.authService.refreshTokens(userId, rt);
    }
}