import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { Request } from 'express';
import { Role } from "../enum";
declare const RtStrategy_base: new (...args: any[]) => Strategy;
export declare class RtStrategy extends RtStrategy_base {
    constructor(config: ConfigService);
    validate(req: Request, payload: {
        sub: number;
        email: string;
        roles: Role[];
    }): {
        refreshToken: string;
        sub: number;
        email: string;
        roles: Role[];
    };
}
export {};
