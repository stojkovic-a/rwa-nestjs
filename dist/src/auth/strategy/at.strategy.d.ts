import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { Role } from "../enum";
declare const AtStrategy_base: new (...args: any[]) => Strategy;
export declare class AtStrategy extends AtStrategy_base {
    constructor(config: ConfigService);
    validate(payload: {
        sub: number;
        email: string;
        roles: Role[];
    }): {
        sub: number;
        email: string;
        roles: Role[];
    };
}
export {};
