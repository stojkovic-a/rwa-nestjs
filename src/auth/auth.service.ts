import { HttpCode, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { SignupDto, SigninDto } from "./models";
import * as argon from 'argon2';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/models/user.entity";
import { Repository, TypeORMError } from "typeorm";
import { ForbiddenException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from "@nestjs/config";
import { generateSecureRandomString } from "./code-generation";
import { Role } from "./enum";
import { Tokens } from "./types";
import nodemailer from 'nodemailer';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private jwtService: JwtService,
        private config: ConfigService) {

    }

    // async signin(dto: SigninDto) {
    //     const user: User | null = await this.userRepo.findOneBy({ email: dto.email });
    //     if (!user)
    //         throw new ForbiddenException('Credentials incorrect');

    //     if (!user.accountVerified)
    //         throw new ForbiddenException('Verify the account first');

    //     const pwMatches = await argon.verify(user.passwordHash, dto.password);
    //     if (!pwMatches)
    //         throw new ForbiddenException('Credentials incorrect');


    //     return this.signToken(user.id, user.email, user.roles);
    // }

    // async signup(dto: SignupDto) {
    //     const hash = await argon.hash(dto.password);
    //     const verificatioCode = generateSecureRandomString(128);
    //     const roles: Role[] = [Role.User];
    //     if (dto.isPlayer)
    //         roles.push(Role.Player)
    //     try {
    //         const user = this.userRepo.create({
    //             email: dto.email,
    //             passwordHash: hash,
    //             firstName: dto.firstName,
    //             lastName: dto.lastName,
    //             dateOfBirth: dto.dateOfBirth,
    //             representingCountry: dto.representingCountry,
    //             classicalELo: dto.classicalElo,
    //             rapidElo: dto.rapidElo,
    //             bltizElo: dto.blitzElo,
    //             accountVerified: false,
    //             verificationCode: verificatioCode,
    //             registrationDateTime: new Date(Date.now()),
    //             roles: roles,
    //         })
    //         await this.userRepo.save(user);
    //         return HttpCode(200);

    //     }
    //     catch (e) {
    //         throw new Error(e);
    //     }

    // }

    // async signToken(
    //     userId: number,
    //     email: string,
    //     roles: Role[],
    // ): Promise<{ access_token: string }> {
    //     const payload = {
    //         sub: userId,
    //         email,
    //         roles,
    //     }

    //     const secret = this.config.get('JWT_SIGNIN_SECRET');

    //     const token = await this.jwtService.signAsync(payload,
    //         {
    //             expiresIn: '15m',
    //             secret: secret,
    //         });
    //     return {
    //         access_token: token
    //     }
    // }
    async hashData(data: string) {
        return await argon.hash(data);
    }

    async getTokens(
        userId: number,
        email: string,
        roles: Role[],
    ): Promise<Tokens> {
        const payload = {
            sub: userId,
            email,
            roles
        }
        const accesSecret = this.config.get('JWT_ACCESS_STRATEGY_SECRET')
        const refreshSecret = this.config.get('JWT_REFRESH_STRATEGY_SECRET')

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(payload, {
                expiresIn: '15m',
                secret: accesSecret
            }),
            this.jwtService.signAsync(payload, {
                expiresIn: 60 * 60 * 24 * 7,
                secret: refreshSecret,
            })
        ])

        return {
            access_token: at,
            refresh_token: rt
        }
    }

    async signupLocal(dto: SignupDto): Promise<Tokens> {
        const hash = await this.hashData(dto.password);
        const verificatioCode = generateSecureRandomString(128);
        const roles: Role[] = [Role.User];
        if (dto.isPlayer)
            roles.push(Role.Player)

        const userExists = await this.userRepo.findOneBy({ email: dto.email });
        if (userExists) {
            if (userExists.accountVerified) {
                throw new ConflictException("Account already exists");
            } else if (userExists.registrationDateTime + this.config.get('VALIDATION_CODE_PERIOD_MS') < Date.now()) {
                await this.userRepo.delete(userExists.id);
            } else {
                throw new ForbiddenException("Verify the account")
            }
        }

        const user = await this.userRepo.create({
            email: dto.email,
            passwordHash: hash,
            firstName: dto.firstName,
            lastName: dto.lastName,
            dateOfBirth: dto.dateOfBirth,
            representingCountry: dto.representingCountry,
            classicalELo: dto.classicalElo,
            rapidElo: dto.rapidElo,
            bltizElo: dto.blitzElo,
            accountVerified: false,
            verificationCode: verificatioCode,
            registrationDateTime: new Date(Date.now()),
            roles: roles,
        })
        await this.userRepo.save(user);

        const tokens = await this.getTokens(user.id, user.email, user.roles);
        await this.updateRtHash(user.id, tokens.refresh_token);

        const emailBody =
            this.config.get('API_URL')
            + this.config.get('VERIFICATION_ROUTE')
            + user.verificationCode;
        await this.sendVerificationEmail(user.email, emailBody);

        return tokens;
    }

    async sendVerificationEmail(userMail: string, link: string) {
        const nodemailer = require('nodemailer');
        console.log(this.config.get("NODEMAILER_HOST"));
        console.log(this.config.get("NODEMAILER_PORT"));

        const transporter: nodemailer.Transporter = nodemailer.createTransport({
            host: this.config.get('NODEMAILER_HOST'),
            port: this.config.get('NODEMAILER_PORT'),
            auth: {
                user: this.config.get('EMAIL'),
                pass: this.config.get('EMAIL_PASSWORD')
            }
        });

        await transporter.sendMail({
            from: `"Chess Forum No Reply" <${this.config.get('EMAIL')}>`,
            to: userMail,
            subject: "Account verification",
            html: `Click the following link to verify your account:<a href=${link}>Click me</a>`
        })
    }
    async verifyEmail(code: string) {
        const user: User | null = await this.userRepo.findOneBy({ verificationCode: code });
        if (!user)
            throw new NotFoundException("Invalid Verification Code");
        if (user.registrationDateTime + this.config.get('VALIDATION_CODE_PERIOD_MS') < Date.now) {
            await this.userRepo.delete(user.id);
            throw new ForbiddenException("Code expired");
        }
        await this.userRepo.update(user.id, { accountVerified: true });
    }



    async updateRtHash(userId: number, rt: string) {
        const hash = await this.hashData(rt);
        await this.userRepo.update(userId, { refreshTokenHash: hash });
    }

    async signinLocal(dto: SigninDto): Promise<Tokens> {
        const user: User | null = await this.userRepo.findOneBy({ email: dto.email });
        if (!user)
            throw new ForbiddenException('Credentials incorrect');

        if (!user.accountVerified)
            throw new ForbiddenException('Verify the account first');

        const pwMatches = await argon.verify(user.passwordHash, dto.password);
        if (!pwMatches)
            throw new ForbiddenException('Credentials incorrect');

        const tokens = await this.getTokens(user.id, user.email, user.roles);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async logout(userId: number) {
        return this.userRepo.createQueryBuilder()
            .update(User)
            .set({ refreshTokenHash: null })
            .where('id = :id', { id: userId })
            .andWhere('refreshTokenHash IS NOT NULL')
            .execute();

    }

    async refreshTokens(userId: number, rt: string) {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user || !user.refreshTokenHash)
            throw new ForbiddenException('Acces Denied');

        const rtMatches = await argon.verify(user.refreshTokenHash, rt);
        if (!rtMatches)
            throw new ForbiddenException('Acces Denied');

        const tokens = await this.getTokens(user.id, user.email, user.roles);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

}