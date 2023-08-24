import { AuthService } from "./auth.service";
import { SignupDto } from "./models/signupDto";
import { SigninDto } from "./models/signinDto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignupDto): Promise<MethodDecorator>;
    signin(dto: SigninDto): Promise<{
        access_token: string;
    }>;
}
