import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PositionToGame } from './models/position-to-game.entity';
import { Repository } from 'typeorm';
import { GamePosNum, posToGameCreateionDto, posToGameUpdateDto } from './models';
import { Game, GamePlayerTournamentPositionDto } from 'src/game/models';
import { Position } from 'src/position/models';

@Injectable()
export class PositionToGameService {

    constructor(
        @InjectRepository(PositionToGame) private posToGameRepo: Repository<PositionToGame>,
        @InjectRepository(Position) private positionRepo: Repository<Position>,
        @InjectRepository(Game) private gameRepo: Repository<Game>,
    ) {

    }

    public async getPosToGame(id: number) {
        return await this.posToGameRepo.findOneBy({ id: id });
    }

    // public async getGameByPosition(pos: string) {
    //     console.log(pos);
    //     const position: Position = await this.positionRepo.findOneBy({ position: pos })
    //     const posToGames = await this.posToGameRepo
    //         .createQueryBuilder('positionToGame')
    //         .where('positionToGame.positionId= :positionId', { positionId: position.id })
    //         .getMany();
    //     console.log(posToGames);
    //     const uniqueGameIds = new Set<number>();
    //     const games: Game[] = []
    //     for (const ptg of posToGames) {
    //         const game = await ptg.game;
    //         const setSize = uniqueGameIds.size;
    //         uniqueGameIds.add(game.id);
    //         if (setSize !== uniqueGameIds.size) {
    //             games.push(game);
    //         }
    //     }

    //     const gamePlayers: GamePlayerTournamentPositionDto[] = [];

    //     for (let game of games) {
    //         let blackPlayer = await game.blackPlayer;
    //         let whitePlayer = await game.whitePlayer;
    //         let tournament = await game.tournament;
    //         // let posToGame = await game.positionToGame;
    //         const gamePlayer: GamePlayerTournamentPositionDto = new GamePlayerTournamentPositionDto();
    //         gamePlayer.id = game.id;
    //         gamePlayer.whitePlayer = whitePlayer;
    //         gamePlayer.blackPlayer = blackPlayer;
    //         gamePlayer.gameDate = game.gameDate;
    //         gamePlayer.winnerId = game.winnerId;
    //         gamePlayer.startingTime = game.startingTime;
    //         gamePlayer.increment = game.increment;
    //         gamePlayer.tournament = tournament;
    //         // gamePlayer.positionToGame = posToGame;
    //         gamePlayer.gamePgn = game.gamePgn;
    //         gamePlayers.push(gamePlayer);
    //     }
    //     // console.log(gamePlayers);
    //     return gamePlayers;

    // }
    public async getNumberOfGamesByPosition(pos: string) {
        const position: Position = await this.positionRepo.findOneBy({ position: pos })

        if (!position) {
            return []; // Handle the case when the position is not found
        }

        // Query unique game IDs directly
        const uniqueGameIdsWithMoveNumber = await this.posToGameRepo
            .createQueryBuilder('positionToGame')
            .select('DISTINCT("positionToGame"."gameId")', 'gameId')
            .addSelect('"positionToGame"."moveNumber"', 'moveNumber')
            .where('"positionToGame"."positionId" = :positionId', { positionId: position.id })
            .getRawMany();

        return uniqueGameIdsWithMoveNumber.length;
    }
    public async getGameByPosition(pos: string, pageNum: number, pageSize: number) {

        // Find the position by its name
        const position: Position = await this.positionRepo.findOneBy({ position: pos })

        if (!position) {
            return []; // Handle the case when the position is not found
        }

        // Query unique game IDs directly
        const uniqueGameIdsWithMoveNumber = await this.posToGameRepo
            .createQueryBuilder('positionToGame')
            .select('DISTINCT("positionToGame"."gameId")', 'gameId')
            .addSelect('"positionToGame"."moveNumber"', 'moveNumber')
            .where('"positionToGame"."positionId" = :positionId', { positionId: position.id })
            .getRawMany();

        const gameIds = uniqueGameIdsWithMoveNumber.map((row) => row.gameId).slice(pageSize * pageNum).slice(0, pageSize);
        const moveNums = uniqueGameIdsWithMoveNumber.map((row) => row.moveNumber).slice(pageSize * pageNum).slice(0, pageSize);
        // Retrieve games in a single query
        const gamesPromises: Promise<Game>[] = []
        gameIds.forEach(id => {
            gamesPromises.push(this.gameRepo.findOneBy({ id: id }));
        })
        const games = await Promise.all(gamesPromises);

        const gamePlayersPromises: Promise<GamePlayerTournamentPositionDto>[] = games.map(async (game) => {
            const gamePlayer: GamePlayerTournamentPositionDto = new GamePlayerTournamentPositionDto();
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
            return new GamePosNum(gp, moveNums[index]);
        })
        return output;

    }

    public async deletePosToGame(id: number) {
        return await this.posToGameRepo.delete(id);
    }

    public async createPosToGame(dto: posToGameCreateionDto) {
        const posToGame = await this.posToGameRepo.create(dto);
        return await this.posToGameRepo.save(posToGame);
    }

    public async updatePosToGame(id: number, dto: posToGameUpdateDto) {
        return await this.posToGameRepo.update(id, dto);
    }

}

