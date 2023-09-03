import { Injectable } from '@nestjs/common';
import { Game } from './models/game.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { gameCreationDto, gameUpdateDto } from './models';
import { User } from 'src/user/models';
import { Tournament } from 'src/tournament/models/tournament.entity';
import { Position } from 'src/position/models/position.entity';
import { LastColor, PositionToGame } from 'src/position-to-game/models/position-to-game.entity';
import { Chess } from 'chess.js';
import { privateDecrypt } from 'crypto';
import { async } from 'rxjs';
@Injectable()
export class GameService {

    constructor(
        @InjectRepository(Game) private gameRepo: Repository<Game>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Tournament) private tournamentRepo: Repository<Tournament>,
        @InjectRepository(Position) private positionRepo: Repository<Position>,
        @InjectRepository(PositionToGame) private posToGameRepo: Repository<PositionToGame>,
    ) {

    }

    public async getGame(id: number) {
        return await this.gameRepo.findOneBy({ id: id });
    }
    public async createGame(dto: gameCreationDto) {
        let blackPlayer = await this.userRepo.findOneBy({ id: dto.blackPlayerId });
        let whitePlayer = await this.userRepo.findOneBy({ id: dto.whitePlayerId });
        let tournament=null;
        if (dto.tournamentId) {
            tournament = await this.tournamentRepo.findOneBy({ id: dto.tournamentId });
        }

        let game=await this.gameRepo.create({
            ...dto,
            blackPlayer:blackPlayer,
            whitePlayer:whitePlayer,
            ...(tournament&&{tournament:tournament})
        });
        game=await this.gameRepo.save(game);

        let positionsToGame=[];
        console.log(dto.gamePGN.length!=0);
        if (dto.gamePGN.length!=0) {
            const chess = new Chess();
            chess.loadPgn(dto.gamePGN.join('\n'));
            const moves = chess.history();
            let chess1 = new Chess();
            console.log(moves.length,"moves length");
            console.log(moves);
            for (let i = 0; i < moves.length; i++) {
                console.log("uso u petlju");
                chess1.move(moves[i]);
                const fen = chess1.fen();
                let pos = await this.positionRepo.findOneBy({ position: fen });
                let posId = -1;
                if (!pos) {
                    const posEntity = this.positionRepo.create({
                        position: fen
                    });
                    pos = (await this.positionRepo.save(posEntity));
                    console.log(pos);
                }
                let posToGame = await this.posToGameRepo.create({
                    moveNumber: i + 1,
                    lastColorMove: i % 2 == 0 ? LastColor.WHITE : LastColor.BLACK,
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

    public async updateGame(id: number, dto: gameUpdateDto) {
        const game = await this.gameRepo.findOneBy({ id: id });
        let blackPlayer = game.blackPlayer;
        let whitePlayer = game.whitePlayer;
        let tournament = game.tournament;
        let positionsToGame: PositionToGame[] = game.positionToGame;

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
            .from(PositionToGame)
            .where('gameId=:id',{id:id})
            .execute();
            positionsToGame = [];
            const chess = new Chess();
            chess.loadPgn(dto.gamePGN.join('\n'));
            const moves = chess.history();
            let chess1 = new Chess();
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
                    lastColorMove: i % 2 == 0 ? LastColor.WHITE : LastColor.BLACK,
                    whiteTimeLeft: -1,
                    blackTimeLeft: -1,
                    position: pos,
                    game: game
                });
                positionsToGame.push(await this.posToGameRepo.save(posToGame));
            }
        }

    }

    public async deleteGame(id: number) {
        return await this.gameRepo.delete(id);
    }
}
