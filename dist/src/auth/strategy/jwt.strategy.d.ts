import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { User } from "src/user/models/user.entity";
import { Role } from "../enum";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepo;
    constructor(config: ConfigService, userRepo: Repository<User>);
    validate(payload: {
        sub: number;
        email: string;
        roles: Role[];
    }): Promise<User>;
}
export {};
