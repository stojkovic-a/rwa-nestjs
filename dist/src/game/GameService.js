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
const models_1 = require("./models");
const models_2 = require("../user/models");
const tournament_entity_1 = require("../tournament/models/tournament.entity");
const position_entity_1 = require("../position/models/position.entity");
const position_to_game_entity_1 = require("../position-to-game/models/position-to-game.entity");
const chess_js_1 = require("chess.js");
const models_3 = require("../position/models");
const position_to_game_basic_dto_1 = require("../position-to-game/models/position-to-game-basic.dto");
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
    async getGamesPaging(skip, take, params) {
        const query = {
            skip,
            take,
            order: { gameDate: 'DESC' },
        };
        const whiteFirstName = params.white.split(' ')[0];
        const whiteLastName = params.white.split(' ')[1];
        const blackFirstName = params.black.split(' ')[0];
        const blackLastName = params.black.split(' ')[1];
        if (whiteFirstName && whiteFirstName.trim() !== '') {
            query.where = {
                ...query.where,
                whitePlayer: {
                    firstName: (0, typeorm_1.Like)(`%${whiteFirstName}%`),
                },
            };
        }
        if (whiteLastName && whiteLastName.trim() !== '') {
            query.where = {
                ...query.where,
                whitePlayer: {
                    lastName: (0, typeorm_1.Like)(`%${whiteLastName}%`),
                },
            };
        }
        if (blackFirstName && blackFirstName.trim() !== '') {
            query.where = {
                ...query.where,
                blackPlayer: {
                    firstName: (0, typeorm_1.Like)(`%${blackFirstName}%`),
                },
            };
        }
        if (blackLastName && blackLastName.trim() !== '') {
            query.where = {
                ...query.where,
                blackPlayer: {
                    lastName: (0, typeorm_1.Like)(`%${blackLastName}%`),
                },
            };
        }
        if (params.res && params.res.trim() !== '') {
            if (params.res === '1-0') {
                query.where = {
                    ...query.where,
                    winnerId: (0, typeorm_1.Raw)(alias => `"winnerId" = "whitePlayerId"`),
                };
            }
            else if (params.res === '0-1') {
                query.where = {
                    ...query.where,
                    winnerId: (0, typeorm_1.Raw)(alias => `"winnerId" = "blackPlayerId"`),
                };
            }
            else if (params.res === '1/2-1/2') {
                query.where = {
                    ...query.where,
                    winnerId: (0, typeorm_1.LessThanOrEqual)(0),
                };
            }
        }
        if (params.tour && params.tour.trim() !== '') {
            query.where = {
                ...query.where,
                tournament: {
                    tournamentName: (0, typeorm_1.Like)(`%${params.tour}%`),
                },
            };
        }
        if ((params.startD && params.startD.trim() !== '' && params.startD !== 'Invalid Date') ||
            (params.endD && params.endD.trim() !== '' && params.endD !== 'Invalid Date')) {
            if ((params.startD && params.startD.trim() !== '' && params.startD !== 'Invalid Date') &&
                (params.endD && params.endD.trim() !== '' && params.endD !== 'Invalid Date')) {
                const startDate = new Date(params.startD);
                const endDate = new Date(params.endD);
                query.where = {
                    ...query.where,
                    gameDate: (0, typeorm_1.Between)(startDate, endDate)
                };
            }
            else if ((params.startD && params.startD.trim() !== '' && params.startD !== 'Invalid Date')) {
                const startDate = new Date(params.startD);
                query.where = {
                    ...query.where,
                    gameDate: (0, typeorm_1.MoreThanOrEqual)(startDate),
                };
            }
            else {
                const endDate = new Date(params.endD);
                query.where = {
                    ...query.where,
                    gameDate: (0, typeorm_1.LessThanOrEqual)(endDate),
                };
            }
        }
        const games = await this.gameRepo.find(query);
        const gamePlayers = [];
        for (let game of games) {
            let blackPlayer = await game.blackPlayer;
            let whitePlayer = await game.whitePlayer;
            let tournament = await game.tournament;
            let posToGame = await game.positionToGame;
            delete whitePlayer.passwordHash;
            delete whitePlayer.refreshTokenHash;
            delete whitePlayer.verificationCode;
            delete blackPlayer.passwordHash;
            delete blackPlayer.refreshTokenHash;
            delete blackPlayer.verificationCode;
            const gamePlayer = new models_1.GamePlayerTournamentPositionDto();
            gamePlayer.id = game.id;
            gamePlayer.whitePlayer = whitePlayer;
            gamePlayer.blackPlayer = blackPlayer;
            gamePlayer.gameDate = game.gameDate;
            gamePlayer.winnerId = game.winnerId;
            gamePlayer.startingTime = game.startingTime;
            gamePlayer.increment = game.increment;
            gamePlayer.tournament = tournament;
            gamePlayer.positionToGame = posToGame;
            gamePlayer.gamePgn = game.gamePgn;
            gamePlayers.push(gamePlayer);
        }
        return gamePlayers;
    }
    async getNumberOfGames() {
        return await this.gameRepo.count();
    }
    async getGameTournamentPagination(skip, take) {
        const games = await this.gameRepo.find({
            skip: skip,
            take: take,
        });
        const gameTournamentMappings = await Promise.all(games.map(async (game) => {
            const tournament = await game.tournament;
            if (!tournament) {
                return null;
            }
            else {
                return {
                    gameId: game.id,
                    tournamentId: tournament.id,
                };
            }
        }));
        const filteredMappings = gameTournamentMappings.filter((mapping) => mapping !== null);
        return filteredMappings;
    }
    async createGame(dto) {
        const [blackPlayer, whitePlayer, tournament] = await Promise.all([
            this.userRepo.findOneBy({ id: dto.blackPlayerId }),
            this.userRepo.findOneBy({ id: dto.whitePlayerId }),
            !dto.tournamentId ? this.tournamentRepo.findOneBy({ id: dto.tournamentId }) : null,
        ]);
        if (whitePlayer && blackPlayer) {
            let game = await this.gameRepo.create({
                ...dto,
                blackPlayer: blackPlayer,
                whitePlayer: whitePlayer,
                gamePgn: dto.gamePGN.join(),
                ...(tournament && { tournament: tournament })
            });
            game = await this.gameRepo.save(game);
            if (dto.gamePGN.length != 0) {
                const chess = new chess_js_1.Chess();
                chess.loadPgn(dto.gamePGN.join('\n'));
                const moves = chess.history();
                let chess1 = new chess_js_1.Chess();
                const positionsToGamePromises = moves.map(async (move, i) => {
                    chess1.move(moves[i]);
                    const fen = chess1.fen();
                    let pos = await this.positionRepo.findOneBy({ position: fen });
                    if (!pos) {
                        const posEntity = this.positionRepo.create({
                            position: fen
                        });
                        pos = (await this.positionRepo.save(posEntity));
                    }
                    let posToGame = this.posToGameRepo.create({
                        moveNumber: i + 1,
                        lastColorMove: i % 2 == 0 ? position_to_game_entity_1.LastColor.WHITE : position_to_game_entity_1.LastColor.BLACK,
                        whiteTimeLeft: -1,
                        blackTimeLeft: -1,
                        position: pos,
                        game: game
                    });
                    return posToGame;
                });
                const positionsToGame = await Promise.all(positionsToGamePromises);
                await this.posToGameRepo.save(positionsToGame);
            }
            return game.id;
        }
    }
    async updateGame(id, dto) {
        const game = await this.gameRepo.findOneBy({ id: id });
        let blackPlayer = game.blackPlayer;
        let whitePlayer = game.whitePlayer;
        let tournament = game.tournament;
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
            gamePgn: dto.gamePGN.join(),
            ...(dto.gameDate && { gameDate: dto.gameDate }),
            ...(dto.winnerId && { winnerId: dto.winnerId }),
            ...(dto.startingTime && { startingTime: dto.startingTime }),
            ...(dto.increment && { increment: dto.increment }),
        });
        if (dto.gamePGN.length != 0) {
            await this.posToGameRepo
                .createQueryBuilder()
                .delete()
                .from(position_to_game_entity_1.PositionToGame)
                .where('gameId=:id', { id: id })
                .execute();
            const chess = new chess_js_1.Chess();
            chess.loadPgn(dto.gamePGN.join('\n'));
            const moves = chess.history();
            let chess1 = new chess_js_1.Chess();
            const positionsToGamePromises = moves.map(async (move, i) => {
                chess1.move(moves[i]);
                const fen = chess1.fen();
                let pos = await this.positionRepo.findOneBy({ position: fen });
                if (!pos) {
                    const posEntity = this.positionRepo.create({
                        position: fen
                    });
                    pos = (await this.positionRepo.save(posEntity));
                }
                let posToGame = this.posToGameRepo.create({
                    moveNumber: i + 1,
                    lastColorMove: i % 2 == 0 ? position_to_game_entity_1.LastColor.WHITE : position_to_game_entity_1.LastColor.BLACK,
                    whiteTimeLeft: -1,
                    blackTimeLeft: -1,
                    position: pos,
                    game: game
                });
                return posToGame;
            });
            const positionsToGame = await Promise.all(positionsToGamePromises);
            await this.posToGameRepo.save(positionsToGame);
        }
    }
    async deleteGame(id) {
        return await this.gameRepo.delete(id);
    }
    async getPositionsFromGame(id) {
        const game = await this.gameRepo.findOneBy({ id: id });
        let blackPlayer = await game.blackPlayer;
        let whitePlayer = await game.whitePlayer;
        let tournament = await game.tournament;
        let posToGame = await game.positionToGame;
        const gamePlayer = new models_1.GamePlayerTournamentPositionDto();
        gamePlayer.id = game.id;
        gamePlayer.whitePlayer = whitePlayer;
        gamePlayer.blackPlayer = blackPlayer;
        gamePlayer.gameDate = game.gameDate;
        gamePlayer.winnerId = game.winnerId;
        gamePlayer.startingTime = game.startingTime;
        gamePlayer.increment = game.increment;
        gamePlayer.tournament = tournament;
        gamePlayer.positionToGame = new Array(posToGame.length);
        posToGame.forEach((ptg, index) => {
            gamePlayer.positionToGame[index] = new position_to_game_basic_dto_1.PositionToGameBasic();
            gamePlayer.positionToGame[index].id = ptg.id;
            gamePlayer.positionToGame[index].whiteTimeLeft = ptg.whiteTimeLeft;
            gamePlayer.positionToGame[index].blackTimeLeft = ptg.blackTimeLeft;
            gamePlayer.positionToGame[index].moveNumber = ptg.moveNumber;
            gamePlayer.positionToGame[index].lastColorMove = ptg.lastColorMove;
        });
        for (let index = 0; index < gamePlayer.positionToGame.length; index++) {
            const posDto = new models_3.positionDto();
            const temp = await posToGame[index].position;
            posDto.id = temp.id;
            posDto.position = temp.position;
            gamePlayer.positionToGame[index].position = posDto;
        }
        gamePlayer.gamePgn = game.gamePgn;
        await Promise.all(gamePlayer.positionToGame);
        return gamePlayer;
    }
};
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(game_entity_1.Game)),
    __param(1, (0, typeorm_2.InjectRepository)(models_2.User)),
    __param(2, (0, typeorm_2.InjectRepository)(tournament_entity_1.Tournament)),
    __param(3, (0, typeorm_2.InjectRepository)(position_entity_1.Position)),
    __param(4, (0, typeorm_2.InjectRepository)(position_to_game_entity_1.PositionToGame)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], GameService);
//# sourceMappingURL=GameService.js.map