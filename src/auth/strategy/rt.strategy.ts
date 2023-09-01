import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';
import { Injectable } from "@nestjs/common";
import { Role } from "../enum";

@Injectable()
export class RtStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh'
) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_REFRESH_STRATEGY_SECRET'),
            passReqToCallback: true
        });
    }

    validate(req: Request, payload: {
        sub: number,
        email: string,
        roles: Role[]
    }) {
        const refreshToken = req.get('authorization').replace('Bearer', '').trim();
        return {
            ...payload,
            refreshToken,
        };
    }
}