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
exports.TournamentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tournament_entity_1 = require("./models/tournament.entity");
const typeorm_2 = require("typeorm");
const models_1 = require("../user/models");
const models_2 = require("../game/models");
let TournamentService = exports.TournamentService = class TournamentService {
    constructor(tournamentRepo, userRepo, gameRepo) {
        this.tournamentRepo = tournamentRepo;
        this.userRepo = userRepo;
        this.gameRepo = gameRepo;
    }
    async getTournament(id) {
        return await this.tournamentRepo.findOneBy({ id: id });
    }
    async deleteTournament(id) {
        return await this.tournamentRepo.delete(id);
    }
    async createTournament(dto) {
        const tournament = await this.tournamentRepo.create(dto);
        return await this.tournamentRepo.save(tournament);
    }
    async updateTournament(id, dto) {
        return await this.tournamentRepo.update(id, dto);
    }
    async addPlayer(userId, tourId) {
        const player = await this.userRepo.findOneBy({ id: userId });
        const tournament = await this.tournamentRepo.findOneBy({ id: tourId });
        let canAdd = false;
        if (tournament.gamesType === tournament_entity_1.GameType.CLASSICAL &&
            player.classicalELo >= tournament.minElo) {
            canAdd = true;
        }
        if (tournament.gamesType === tournament_entity_1.GameType.RAPID &&
            player.rapidElo >= tournament.minElo) {
            canAdd = true;
        }
        if (tournament.gamesType === tournament_entity_1.GameType.BLITZ &&
            player.bltizElo >= tournament.minElo) {
            canAdd = true;
        }
        if (canAdd) {
            const alreadySignedUp = await tournament.players;
            let addedAlready = 0;
            addedAlready = alreadySignedUp.filter(p => p.id == player.id).length;
            if (!addedAlready) {
                (await tournament.players).push(player);
                return await this.tournamentRepo.save(tournament);
            }
            return new common_1.ForbiddenException("Already added");
        }
        return new common_1.ForbiddenException("Elo too low");
    }
    async removePlayer(userId, tourId) {
        const player = await this.userRepo.findOneBy({ id: userId });
        const tournament = await this.tournamentRepo.findOneBy({ id: tourId });
        tournament.players = (await tournament.players).filter(p => p.id != player.id);
        return await this.tournamentRepo.save(tournament);
    }
    async addGame(gameId, tourId) {
        const game = await this.gameRepo.findOneBy({ id: gameId });
        const tournament = await this.tournamentRepo.findOneBy({ id: tourId });
        let canAdd = false;
        (await tournament.games).push(game);
        return await this.tournamentRepo.save(tournament);
    }
    async removeGame(gameId, tourId) {
        const game = await this.gameRepo.findOneBy({ id: gameId });
        const tournament = await this.tournamentRepo.findOneBy({ id: tourId });
        tournament.games = (await tournament.games).filter(p => p.id != game.id);
        return await this.tournamentRepo.save(tournament);
    }
};
exports.TournamentService = TournamentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tournament_entity_1.Tournament)),
    __param(1, (0, typeorm_1.InjectRepository)(models_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(models_2.Game)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TournamentService);
//# sourceMappingURL=tournament.service.js.map