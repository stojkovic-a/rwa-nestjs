import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Role } from "../enum";


@Injectable()
export class AtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_ACCESS_STRATEGY_SECRET')
        });
    }

    validate(payload: {
        sub: number,
        email: string,
        roles: Role[]
    }) {
        return payload;
    }
}