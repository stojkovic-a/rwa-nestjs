import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/models/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
) {
    constructor(config: ConfigService, @InjectRepository(User) private userRepo: Repository<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SIGNIN_SECRET'),
        })
    }

    async validate(payload: {
        sub: number,
        email: string,
        role: string
    }) {
        const user =
            await this.userRepo.findOneBy({ id: payload.sub });
        delete user.passwordHash;
        console.log(user);
        return user;
    }
}