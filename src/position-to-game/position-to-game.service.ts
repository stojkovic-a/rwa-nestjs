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

   
    public async getNumberOfGamesByPosition(pos: string) {
        const position: Position = await this.positionRepo.findOneBy({ position: pos })

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
    public async getGameByPosition(pos: string, pageNum: number, pageSize: number) {

        const position: Position = await this.positionRepo.findOneBy({ position: pos })

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

