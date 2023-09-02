import { SignupDto, SigninDto } from "./models";
import { User } from "src/user/models/user.entity";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";
import { Role } from "./enum";
import { Tokens } from "./types";
export declare class AuthService {
    private userRepo;
    private jwtService;
    private config;
    constructor(userRepo: Repository<User>, jwtService: JwtService, config: ConfigService);
    hashData(data: string): Promise<string>;
    getTokens(userId: number, email: string, roles: Role[]): Promise<Tokens>;
    signupLocal(dto: SignupDto): Promise<Tokens>;
    sendVerificationEmail(userMail: string, link: string): Promise<void>;
    verifyEmail(code: string): Promise<void>;
    updateRtHash(userId: number, rt: string): Promise<void>;
    signinLocal(dto: SigninDto): Promise<Tokens>;
    logout(userId: number): Promise<import("typeorm").UpdateResult>;
    refreshTokens(userId: number, rt: string): Promise<Tokens>;
}
