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
exports.PositionToGameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const position_to_game_entity_1 = require("./models/position-to-game.entity");
const typeorm_2 = require("typeorm");
const models_1 = require("./models");
const models_2 = require("../game/models");
const models_3 = require("../position/models");
let PositionToGameService = exports.PositionToGameService = class PositionToGameService {
    constructor(posToGameRepo, positionRepo, gameRepo) {
        this.posToGameRepo = posToGameRepo;
        this.positionRepo = positionRepo;
        this.gameRepo = gameRepo;
    }
    async getPosToGame(id) {
        return await this.posToGameRepo.findOneBy({ id: id });
    }
    async getNumberOfGamesByPosition(pos) {
        const position = await this.positionRepo.findOneBy({ position: pos });
        if (!position) {
            return [];
        }
        const uniqueGameIdsWithMoveNumber = await this.posToGameRepo
            .createQueryBuilder('positionToGame')
            .select('DISTINCT("positionToGame"."gameId")', 'gameId')
            .addSelect('"positionToGame"."moveNumber"', 'moveNumber')
            .where('"positionToGame"."positionId" = :positionId', { positionId: position.id })
            .getRawMany();
        return uniqueGameIdsWithMoveNumber.length;
    }
    async getGameByPosition(pos, pageNum, pageSize) {
        const position = await this.positionRepo.findOneBy({ position: pos });
        if (!position) {
            return [];
        }
        const uniqueGameIdsWithMoveNumber = await this.posToGameRepo
            .createQueryBuilder('positionToGame')
            .select('DISTINCT("positionToGame"."gameId")', 'gameId')
            .addSelect('"positionToGame"."moveNumber"', 'moveNumber')
            .where('"positionToGame"."positionId" = :positionId', { positionId: position.id })
            .getRawMany();
        const gameIds = uniqueGameIdsWithMoveNumber.map((row) => row.gameId).slice(pageSize * pageNum).slice(0, pageSize);
        const moveNums = uniqueGameIdsWithMoveNumber.map((row) => row.moveNumber).slice(pageSize * pageNum).slice(0, pageSize);
        const gamesPromises = [];
        gameIds.forEach(id => {
            gamesPromises.push(this.gameRepo.findOneBy({ id: id }));
        });
        const games = await Promise.all(gamesPromises);
        const gamePlayersPromises = games.map(async (game) => {
            const gamePlayer = new models_2.GamePlayerTournamentPositionDto();
            gamePlayer.id = game.id;
            gamePlayer.whitePlayer = await game.whitePlayer;
            gamePlayer.blackPlayer = await game.blackPlayer;
            gamePlayer.gameDate = game.gameDate;
            gamePlayer.winnerId = game.winnerId;
            gamePlayer.startingTime = game.startingTime;
            gamePlayer.increment = game.increment;
            gamePlayer.tournament = await game.tournament;
            gamePlayer.gamePgn = game.gamePgn;
            return gamePlayer;
        });
        const gamePlayers = await Promise.all(gamePlayersPromises);
        const output = gamePlayers.map((gp, index) => {
            return new models_1.GamePosNum(gp, moveNums[index]);
        });
        return output;
    }
    async deletePosToGame(id) {
        return await this.posToGameRepo.delete(id);
    }
    async createPosToGame(dto) {
        const posToGame = await this.posToGameRepo.create(dto);
        return await this.posToGameRepo.save(posToGame);
    }
    async updatePosToGame(id, dto) {
        return await this.posToGameRepo.update(id, dto);
    }
};
exports.PositionToGameService = PositionToGameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(position_to_game_entity_1.PositionToGame)),
    __param(1, (0, typeorm_1.InjectRepository)(models_3.Position)),
    __param(2, (0, typeorm_1.InjectRepository)(models_2.Game)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PositionToGameService);
//# sourceMappingURL=position-to-game.service.js.map