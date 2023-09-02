import { AuthService } from "./auth.service";
import { SignupDto, SigninDto } from "./models";
import { Tokens } from "./types";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signupLocal(dto: SignupDto): Promise<Tokens>;
    verifyEmail(code: string): Promise<string>;
    signinLocal(dto: SigninDto): Promise<Tokens>;
    logout(userId: number): Promise<import("typeorm").UpdateResult>;
    refreshTokens(userId: number, rt: string): Promise<Tokens>;
}
