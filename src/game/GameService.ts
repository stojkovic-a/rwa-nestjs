import { Injectable } from '@nestjs/common';
import { Game } from './models/game.entity';
import { Between, FindManyOptions, LessThanOrEqual, Like, MoreThanOrEqual, Raw, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GamePlayerTournamentPositionDto, gameCreationDto, gameUpdateDto } from './models';
import { User } from 'src/user/models';
import { Tournament } from 'src/tournament/models/tournament.entity';
import { Position } from 'src/position/models/position.entity';
import { LastColor, PositionToGame } from 'src/position-to-game/models/position-to-game.entity';
import { Chess } from 'chess.js';
import { positionDto } from 'src/position/models';
import { PositionToGameBasic } from 'src/position-to-game/models/position-to-game-basic.dto';

@Injectable()
export class GameService {

    constructor(
        @InjectRepository(Game) private gameRepo: Repository<Game>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Tournament) private tournamentRepo: Repository<Tournament>,
        @InjectRepository(Position) private positionRepo: Repository<Position>,
        @InjectRepository(PositionToGame) private posToGameRepo: Repository<PositionToGame>
    ) {
    }

    public async getGame(id: number) {
        return await this.gameRepo.findOneBy({ id: id });
    }


    public async getGamesPaging(
        skip: number,
        take: number,
        params: any
    ): Promise<GamePlayerTournamentPositionDto[]> {
        const query: FindManyOptions<Game> = {
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
                    firstName: Like(`%${whiteFirstName}%`),
                },
            };
        }

        if (whiteLastName && whiteLastName.trim() !== '') {
            query.where = {
                ...query.where,
                whitePlayer: {
                    lastName: Like(`%${whiteLastName}%`),
                },
            };
        }

        if (blackFirstName && blackFirstName.trim() !== '') {
            query.where = {
                ...query.where,
                blackPlayer: {
                    firstName: Like(`%${blackFirstName}%`),
                },
            };
        }

        if (blackLastName && blackLastName.trim() !== '') {
            query.where = {
                ...query.where,
                blackPlayer: {
                    lastName: Like(`%${blackLastName}%`),
                },
            };
        }
        if (params.res && params.res.trim() !== '') {
            if (params.res === '1-0') {
                query.where = {
                    ...query.where,
                    winnerId: Raw(alias => `"winnerId" = "whitePlayerId"`),
                };
            } else if (params.res === '0-1') {
                query.where = {
                    ...query.where,
                    winnerId: Raw(alias => `"winnerId" = "blackPlayerId"`),
                };
            } else if (params.res === '1/2-1/2') {
                query.where = {
                    ...query.where,
                    winnerId: LessThanOrEqual(0), // Assuming winnerId <= 0 for draws
                };
            }
        }

        if (params.tour && params.tour.trim() !== '') {
            query.where = {
                ...query.where,
                tournament: {
                    tournamentName: Like(`%${params.tour}%`),
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
                    gameDate: Between(startDate, endDate)
                };
            } else if ((params.startD && params.startD.trim() !== '' && params.startD !== 'Invalid Date')) {
                const startDate = new Date(params.startD);
                query.where = {
                    ...query.where,
                    gameDate: MoreThanOrEqual(startDate),
                };
            } else {
                const endDate = new Date(params.endD);
                query.where = {
                    ...query.where,
                    gameDate: LessThanOrEqual(endDate),
                };
            }
        }

        // if (params.endD && params.endD.trim() !== '' && params.endD !== 'Invalid Date') {
        //     const endDate = new Date(params.endD);
        //     query.where = {
        //         ...query.where,
        //         gameDate: LessThanOrEqual(endDate),
        //     };
        // }
        const games = await this.gameRepo.find(query);

        const gamePlayers: GamePlayerTournamentPositionDto[] = [];

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
            
            const gamePlayer: GamePlayerTournamentPositionDto = new GamePlayerTournamentPositionDto();
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

    public async getNumberOfGames() {
        return await this.gameRepo.count();
    }

    public async getGameTournamentPagination(skip: number, take: number) {
        const games = await this.gameRepo.find({
            skip: skip,
            take: take,
        });

        const gameTournamentMappings = await Promise.all(
            games.map(async (game) => {
                const tournament = await game.tournament;
                if (!tournament) {
                    return null;
                } else {
                    return {
                        gameId: game.id,
                        tournamentId: tournament.id,
                    };
                }
            })
        );

        const filteredMappings = gameTournamentMappings.filter((mapping) => mapping !== null);

        return filteredMappings;

    }
    public async createGame(dto: gameCreationDto) {
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
                const chess = new Chess();
                chess.loadPgn(dto.gamePGN.join('\n'));
                const moves = chess.history();
                let chess1 = new Chess();

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
                        lastColorMove: i % 2 == 0 ? LastColor.WHITE : LastColor.BLACK,
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

    public async updateGame(id: number, dto: gameUpdateDto) {
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
                .from(PositionToGame)
                .where('gameId=:id', { id: id })
                .execute();
            const chess = new Chess();
            chess.loadPgn(dto.gamePGN.join('\n'));
            const moves = chess.history();
            let chess1 = new Chess();
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
                    lastColorMove: i % 2 == 0 ? LastColor.WHITE : LastColor.BLACK,
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

    public async deleteGame(id: number) {
        return await this.gameRepo.delete(id);
    }

    public async getPositionsFromGame(id: number) {
        const game = await this.gameRepo.findOneBy({ id: id });

        let blackPlayer = await game.blackPlayer;
        let whitePlayer = await game.whitePlayer;
        let tournament = await game.tournament;
        let posToGame = await game.positionToGame;
        const gamePlayer: GamePlayerTournamentPositionDto = new GamePlayerTournamentPositionDto();

        gamePlayer.id = game.id;
        gamePlayer.whitePlayer = whitePlayer;
        gamePlayer.blackPlayer = blackPlayer;
        gamePlayer.gameDate = game.gameDate;
        gamePlayer.winnerId = game.winnerId;
        gamePlayer.startingTime = game.startingTime;
        gamePlayer.increment = game.increment;
        gamePlayer.tournament = tournament;
        gamePlayer.positionToGame = new Array<PositionToGameBasic>(posToGame.length);
        posToGame.forEach((ptg, index) => {
            gamePlayer.positionToGame[index] = new PositionToGameBasic();
            gamePlayer.positionToGame[index].id = ptg.id;
            gamePlayer.positionToGame[index].whiteTimeLeft = ptg.whiteTimeLeft;
            gamePlayer.positionToGame[index].blackTimeLeft = ptg.blackTimeLeft;
            gamePlayer.positionToGame[index].moveNumber = ptg.moveNumber;
            gamePlayer.positionToGame[index].lastColorMove = ptg.lastColorMove;

        })
        for (let index = 0; index < gamePlayer.positionToGame.length; index++) {
            const posDto: positionDto = new positionDto();

            const temp = await posToGame[index].position;
            posDto.id = temp.id;
            posDto.position = temp.position;
            gamePlayer.positionToGame[index].position = posDto;
        }
        gamePlayer.gamePgn = game.gamePgn;
        await Promise.all(gamePlayer.positionToGame);
        return gamePlayer;

    }

}
