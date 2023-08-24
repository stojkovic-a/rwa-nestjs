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
let AuthService = exports.AuthService = class AuthService {
    constructor(userRepo, jwtService, config) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.config = config;
    }
    async signin(dto) {
        const user = await this.userRepo.findOneBy({ email: dto.email });
        if (!user)
            throw new common_2.ForbiddenException('Credentials incorrect');
        if (!user.accountVerified)
            throw new common_2.ForbiddenException('Verify the account first');
        const pwMatches = await argon.verify(user.passwordHash, dto.password);
        if (!pwMatches)
            throw new common_2.ForbiddenException('Credentials incorrect');
        let userRole = '';
        if (user.isAdmin) {
            userRole = 'admin';
        }
        else {
            userRole = 'user';
        }
        return this.signToken(user.id, user.email, userRole);
    }
    async signup(dto) {
        const hash = await argon.hash(dto.password);
        const verificatioCode = (0, code_generation_1.generateSecureRandomString)(128);
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
                verificationCode: verificatioCode,
                registrationDateTime: Date.now()
            });
            let userRole = '';
            if (user.isAdmin) {
                userRole = 'admin';
            }
            else {
                userRole = 'user';
            }
            return (0, common_1.HttpCode)(200);
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async signToken(userId, email, role) {
        const payload = {
            sub: userId,
            email,
            role,
        };
        const secret = this.config.get('JWT_SIGNIN_SECRET');
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
            secret: secret,
        });
        return {
            access_token: token
        };
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