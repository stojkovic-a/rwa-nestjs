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
exports.MiscService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const models_1 = require("../tournament/models");
const models_2 = require("../user/models");
const typeorm_2 = require("typeorm");
let MiscService = exports.MiscService = class MiscService {
    constructor(userRepo, tournamentRepo) {
        this.userRepo = userRepo;
        this.tournamentRepo = tournamentRepo;
    }
    async getFilters() {
        const playerNames = await this.userRepo
            .createQueryBuilder('user')
            .select('user.firstName, user.lastName')
            .where(':role = ANY(user.roles)', { role: 'Player' })
            .getRawMany();
        const tournamentNames = await this.tournamentRepo
            .createQueryBuilder('tournament')
            .select('tournament.tournamentName')
            .getRawMany();
        const names = playerNames.map((result) => { return `${result.firstName} ${result.lastName}`; });
        const tournaments = tournamentNames.map((result) => {
            return result.tournament_tournamentName;
        });
        return { names, tournaments };
    }
};
exports.MiscService = MiscService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(models_2.User)),
    __param(1, (0, typeorm_1.InjectRepository)(models_1.Tournament)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MiscService);
//# sourceMappingURL=misc.service.js.map