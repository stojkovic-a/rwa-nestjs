import { Game } from './models/game.entity';
import { Repository } from 'typeorm';
import { GamePlayerTournamentPositionDto, gameCreationDto, gameUpdateDto } from './models';
import { User } from 'src/user/models';
import { Tournament } from 'src/tournament/models/tournament.entity';
import { Position } from 'src/position/models/position.entity';
import { PositionToGame } from 'src/position-to-game/models/position-to-game.entity';
export declare class GameService {
    private gameRepo;
    private userRepo;
    private tournamentRepo;
    private positionRepo;
    private posToGameRepo;
    constructor(gameRepo: Repository<Game>, userRepo: Repository<User>, tournamentRepo: Repository<Tournament>, positionRepo: Repository<Position>, posToGameRepo: Repository<PositionToGame>);
    getGame(id: number): Promise<Game>;
    getGamesPaging(skip: number, take: number, params: any): Promise<GamePlayerTournamentPositionDto[]>;
    getNumberOfGames(): Promise<number>;
    getGameTournamentPagination(skip: number, take: number): Promise<{
        gameId: number;
        tournamentId: number;
    }[]>;
    createGame(dto: gameCreationDto): Promise<number>;
    updateGame(id: number, dto: gameUpdateDto): Promise<void>;
    deleteGame(id: number): Promise<import("typeorm").DeleteResult>;
    getPositionsFromGame(id: number): Promise<GamePlayerTournamentPositionDto>;
}
