import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { SignupDto } from "./models/signupDto";
import * as argon from 'argon2';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/models/user.entity";
import { Repository, TypeORMError } from "typeorm";
import { SigninDto } from "./models/signinDto";
import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private jwtService: JwtService,
        private config: ConfigService) {

    }

    async signin(dto: SigninDto) {
        const user: User | null = await this.userRepo.findOneBy({ email: dto.email });
        if (!user)
            throw new ForbiddenException('Credentials incorrect');

        const pwMatches = await argon.verify(user.passwordHash, dto.password);
        if (!pwMatches)
            throw new ForbiddenException('Credentials incorrect');

        let userRole = '';
        if (user.isAdmin) {
            userRole = 'admin'
        } else {
            userRole = 'user';
        }
        return this.signToken(user.id, user.email, userRole);
    }

    async signup(dto: SignupDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = this.userRepo.create({
                email: dto.email,
                passwordHash: hash,
                firstName: dto.firstName,
                lastName: dto.lastName,
                dateOfBirth: dto.dateOfBirth,
                representingCountry: dto.representingCountry,
                classicalELo: dto.classicalElo,
                rapidElo: dto.rapidElo,
                bltizElo: dto.blitzElo,
                isPlayer: dto.isPlayer,
                accountVerified: false,
                isAdmin: false,
            })

            let userRole = '';
            if (user.isAdmin) {
                userRole = 'admin'
            } else {
                userRole = 'user';
            }
            return this.signToken(user.id, user.email, userRole);

        }
        catch (e) {
            throw new Error(e);
        }

    }

    async signToken(
        userId: number,
        email: string,
        role: string
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
            role,
        }

        const secret = this.config.get('JWT_SIGNIN_SECRET');

        const token = await this.jwtService.signAsync(payload,
            {
                expiresIn: '15m',
                secret: secret,
            });
        return {
            access_token: token
        }
    }
}