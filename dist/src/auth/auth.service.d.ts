import { SignupDto } from "./models/signupDto";
import { User } from "src/user/models/user.entity";
import { Repository } from "typeorm";
import { SigninDto } from "./models/signinDto";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private userRepo;
    private jwtService;
    private config;
    constructor(userRepo: Repository<User>, jwtService: JwtService, config: ConfigService);
    signin(dto: SigninDto): Promise<{
        access_token: string;
    }>;
    signup(dto: SignupDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, email: string, role: string): Promise<{
        access_token: string;
    }>;
}
