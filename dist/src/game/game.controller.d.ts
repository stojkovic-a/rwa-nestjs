import { GameService } from './game.service';
import { gameCreationDto, gameUpdateDto } from './models';
export declare class GameController {
    private gameService;
    constructor(gameService: GameService);
    getGame(id: number): Promise<import("./models").Game>;
    createGame(dto: gameCreationDto): Promise<void>;
    updateGame(id: number, dto: gameUpdateDto): Promise<void>;
    deleteGame(id: number): Promise<import("typeorm").DeleteResult>;
}
