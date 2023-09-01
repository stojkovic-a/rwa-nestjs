import { AuthService } from "./auth.service";
import { SignupDto, SigninDto } from "./models";
import { Tokens } from "./types";
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signupLocal(dto: SignupDto): Promise<Tokens>;
    signinLocal(dto: SigninDto): Promise<Tokens>;
    logout(req: Request): Promise<import("typeorm").UpdateResult>;
    refreshTokens(): void;
}
