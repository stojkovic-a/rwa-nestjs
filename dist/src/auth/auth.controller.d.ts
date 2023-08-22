import { AuthService } from "./auth.service";
import { SignupDto } from "./models/signupDto";
import { SigninDto } from "./models/signinDto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignupDto): Promise<{
        access_token: string;
    }>;
    signin(dto: SigninDto): Promise<{
        access_token: string;
    }>;
}
