import { GameService } from './GameService';
import { gameCreationDto, gameUpdateDto } from './models';
export declare class GameController {
    private gameService;
    constructor(gameService: GameService);
    getGame(id: number): Promise<import("./models").Game>;
    getGamesPaging(skip: number, take: number, params: any): Promise<import("./models").GamePlayerTournamentPositionDto[]>;
    getNumberOfGames(): Promise<number>;
    getPositionsFromGame(id: number): Promise<import("./models").GamePlayerTournamentPositionDto>;
    getGameTournamentPagination(skip: number, take: number): Promise<{
        gameId: number;
        tournamentId: number;
    }[]>;
    createGame(dto: gameCreationDto): Promise<number>;
    updateGame(id: number, dto: gameUpdateDto): Promise<void>;
    deleteGame(id: number): Promise<import("typeorm").DeleteResult>;
}
