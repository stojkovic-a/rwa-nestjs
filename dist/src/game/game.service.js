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
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const game_entity_1 = require("./models/game.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const models_1 = require("../user/models");
const tournament_entity_1 = require("../tournament/models/tournament.entity");
const position_entity_1 = require("../position/models/position.entity");
const position_to_game_entity_1 = require("../position-to-game/models/position-to-game.entity");
const chess_js_1 = require("chess.js");
let GameService = exports.GameService = class GameService {
    constructor(gameRepo, userRepo, tournamentRepo, positionRepo, posToGameRepo) {
        this.gameRepo = gameRepo;
        this.userRepo = userRepo;
        this.tournamentRepo = tournamentRepo;
        this.positionRepo = positionRepo;
        this.posToGameRepo = posToGameRepo;
    }
    async getGame(id) {
        return await this.gameRepo.findOneBy({ id: id });
    }
    async createGame(dto) {
        let blackPlayer = await this.userRepo.findOneBy({ id: dto.blackPlayerId });
        let whitePlayer = await this.userRepo.findOneBy({ id: dto.whitePlayerId });
        let tournament = null;
        if (dto.tournamentId) {
            tournament = await this.tournamentRepo.findOneBy({ id: dto.tournamentId });
        }
        let game = await this.gameRepo.create({
            ...dto,
            blackPlayer: blackPlayer,
            whitePlayer: whitePlayer,
            ...(tournament && { tournament: tournament })
        });
        game = await this.gameRepo.save(game);
        let positionsToGame = [];
        if (dto.gamePGN.length != 0) {
            const chess = new chess_js_1.Chess();
            chess.loadPgn(dto.gamePGN.join('\n'));
            const moves = chess.history();
            let chess1 = new chess_js_1.Chess();
            for (let i = 0; i < moves.length; i++) {
                chess1.move(moves[i]);
                const fen = chess1.fen();
                let pos = await this.positionRepo.findOneBy({ position: fen });
                let posId = -1;
                if (!pos) {
                    const posEntity = this.positionRepo.create({
                        position: fen
                    });
                    pos = (await this.positionRepo.save(posEntity));
                }
                let posToGame = await this.posToGameRepo.create({
                    moveNumber: i + 1,
                    lastColorMove: i % 2 == 0 ? position_to_game_entity_1.LastColor.WHITE : position_to_game_entity_1.LastColor.BLACK,
                    whiteTimeLeft: -1,
                    blackTimeLeft: -1,
                    position: pos,
                    game: game
                });
                await this.posToGameRepo.save(posToGame);
                positionsToGame.push(await this.posToGameRepo.save(posToGame));
            }
        }
    }
    async updateGame(id, dto) {
        const game = await this.gameRepo.findOneBy({ id: id });
        let blackPlayer = game.blackPlayer;
        let whitePlayer = game.whitePlayer;
        let tournament = game.tournament;
        let positionsToGame = game.positionToGame;
        if (dto.blackPlayerId) {
            blackPlayer = await this.userRepo.findOneBy({ id: dto.blackPlayerId });
        }
        if (dto.whitePlayerId) {
            whitePlayer = await this.userRepo.findOneBy({ id: dto.whitePlayerId });
        }
        if (dto.tournamentId) {
            tournament = await this.tournamentRepo.findOneBy({ id: dto.tournamentId });
        }
        await this.gameRepo.update(id, {
            whitePlayer: whitePlayer,
            blackPlayer: blackPlayer,
            tournament: tournament,
            ...(dto.gameDate && { gameDate: dto.gameDate }),
            ...(dto.winnerId && { winnerId: dto.winnerId }),
            ...(dto.startingTime && { startingTime: dto.startingTime }),
            ...(dto.increment && { increment: dto.increment }),
        });
        if (dto.gamePGN) {
            await this.posToGameRepo
                .createQueryBuilder()
                .delete()
                .from(position_to_game_entity_1.PositionToGame)
                .where('gameId=:id', { id: id })
                .execute();
            positionsToGame = [];
            const chess = new chess_js_1.Chess();
            chess.loadPgn(dto.gamePGN.join('\n'));
            const moves = chess.history();
            let chess1 = new chess_js_1.Chess();
            for (let i = 0; i < moves.length; i++) {
                chess1.move(moves[i]);
                const fen = chess1.fen();
                let pos = await this.positionRepo.findOneBy({ position: fen });
                let posId = -1;
                if (!pos) {
                    const posEntity = this.positionRepo.create({
                        position: fen
                    });
                    pos = (await this.positionRepo.save(posEntity));
                }
                let posToGame = await this.posToGameRepo.create({
                    moveNumber: i + 1,
                    lastColorMove: i % 2 == 0 ? position_to_game_entity_1.LastColor.WHITE : position_to_game_entity_1.LastColor.BLACK,
                    whiteTimeLeft: -1,
                    blackTimeLeft: -1,
                    position: pos,
                    game: game
                });
                positionsToGame.push(await this.posToGameRepo.save(posToGame));
            }
        }
    }
    async deleteGame(id) {
        return await this.gameRepo.delete(id);
    }
};
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(game_entity_1.Game)),
    __param(1, (0, typeorm_2.InjectRepository)(models_1.User)),
    __param(2, (0, typeorm_2.InjectRepository)(tournament_entity_1.Tournament)),
    __param(3, (0, typeorm_2.InjectRepository)(position_entity_1.Position)),
    __param(4, (0, typeorm_2.InjectRepository)(position_to_game_entity_1.PositionToGame)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], GameService);
//# sourceMappingURL=game.service.js.map