"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/models/user.entity");
const typeorm_2 = require("typeorm");
const common_2 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const code_generation_1 = require("./code-generation");
const enum_1 = require("./enum");
let AuthService = exports.AuthService = class AuthService {
    constructor(userRepo, jwtService, config) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.config = config;
    }
    async hashData(data) {
        return await argon.hash(data);
    }
    async getTokens(userId, email, roles) {
        const payload = {
            sub: userId,
            email,
            roles
        };
        const accesSecret = this.config.get('JWT_ACCESS_STRATEGY_SECRET');
        const refreshSecret = this.config.get('JWT_REFRESH_STRATEGY_SECRET');
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(payload, {
                expiresIn: '15m',
                secret: accesSecret
            }),
            this.jwtService.signAsync(payload, {
                expiresIn: 60 * 60 * 24 * 7,
                secret: refreshSecret,
            })
        ]);
        return {
            access_token: at,
            refresh_token: rt
        };
    }
    async signupLocal(dto) {
        const hash = await this.hashData(dto.password);
        const verificatioCode = (0, code_generation_1.generateSecureRandomString)(128);
        const roles = [enum_1.Role.User];
        if (dto.isPlayer)
            roles.push(enum_1.Role.Player);
        const userExists = await this.userRepo.findOneBy({ email: dto.email });
        if (userExists) {
            if (userExists.accountVerified) {
                throw new common_2.ConflictException("Account already exists");
            }
            else if (userExists.registrationDateTime + this.config.get('VALIDATION_CODE_PERIOD_MS') < Date.now()) {
                await this.userRepo.delete(userExists.id);
            }
            else {
                throw new common_2.ForbiddenException("Verify the account");
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
        });
        await this.userRepo.save(user);
        const tokens = await this.getTokens(user.id, user.email, user.roles);
        await this.updateRtHash(user.id, tokens.refresh_token);
        const emailBody = this.config.get('API_URL')
            + this.config.get('VERIFICATION_ROUTE')
            + user.verificationCode;
        await this.sendVerificationEmail(user.email, emailBody);
        return tokens;
    }
    async sendVerificationEmail(userMail, link) {
        const nodemailer = require('nodemailer');
        console.log(this.config.get("NODEMAILER_HOST"));
        console.log(this.config.get("NODEMAILER_PORT"));
        const transporter = nodemailer.createTransport({
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
        });
    }
    async verifyEmail(code) {
        const user = await this.userRepo.findOneBy({ verificationCode: code });
        if (!user)
            throw new common_1.NotFoundException("Invalid Verification Code");
        if (user.registrationDateTime + this.config.get('VALIDATION_CODE_PERIOD_MS') < Date.now) {
            await this.userRepo.delete(user.id);
            throw new common_2.ForbiddenException("Code expired");
        }
        await this.userRepo.update(user.id, { accountVerified: true });
    }
    async updateRtHash(userId, rt) {
        const hash = await this.hashData(rt);
        await this.userRepo.update(userId, { refreshTokenHash: hash });
    }
    async signinLocal(dto) {
        const user = await this.userRepo.findOneBy({ email: dto.email });
        if (!user)
            throw new common_2.ForbiddenException('Credentials incorrect');
        if (!user.accountVerified)
            throw new common_2.ForbiddenException('Verify the account first');
        const pwMatches = await argon.verify(user.passwordHash, dto.password);
        if (!pwMatches)
            throw new common_2.ForbiddenException('Credentials incorrect');
        const tokens = await this.getTokens(user.id, user.email, user.roles);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }
    async logout(userId) {
        return this.userRepo.createQueryBuilder()
            .update(user_entity_1.User)
            .set({ refreshTokenHash: null })
            .where('id = :id', { id: userId })
            .andWhere('refreshTokenHash IS NOT NULL')
            .execute();
    }
    async refreshTokens(userId, rt) {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user || !user.refreshTokenHash)
            throw new common_2.ForbiddenException('Acces Denied');
        const rtMatches = await argon.verify(user.refreshTokenHash, rt);
        if (!rtMatches)
            throw new common_2.ForbiddenException('Acces Denied');
        const tokens = await this.getTokens(user.id, user.email, user.roles);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map