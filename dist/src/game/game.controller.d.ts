import { GameService } from './GameService';
import { gameCreationDto, gameUpdateDto } from './models';
export declare class GameController {
    private gameService;
    constructor(gameService: GameService);
    getGame(id: number): Promise<import("./models").Game>;
    getGamesPaging(skip: number, take: number, params: any): Promise<import("./models").GamePlayerTournamentPositionDto[]>;
    getNumberOfGames(): Promise<number>;
    getPositionsFromGame(id: number): Promise<import("./models").GamePlayerTournamentPositionDto>;
    createGame(dto: gameCreationDto): Promise<void>;
    updateGame(id: number, dto: gameUpdateDto): Promise<void>;
    deleteGame(id: number): Promise<import("typeorm").DeleteResult>;
}
