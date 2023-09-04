import { posToGameCreateionDto, posToGameUpdateDto } from './models';
import { PositionToGameService } from './position-to-game.service';
export declare class PositionToGameController {
    private posToGameService;
    constructor(posToGameService: PositionToGameService);
    getPosToGame(id: number): Promise<import("./models").PositionToGame>;
    createPosToGame(dto: posToGameCreateionDto): Promise<import("./models").PositionToGame>;
    updatePosToGame(id: number, dto: posToGameUpdateDto): Promise<import("typeorm").UpdateResult>;
    deletePosToGame(id: number): Promise<import("typeorm").DeleteResult>;
}
