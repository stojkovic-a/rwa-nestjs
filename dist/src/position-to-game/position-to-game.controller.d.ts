import { posToGameCreateionDto, posToGameUpdateDto } from './models';
import { PositionToGameService } from './position-to-game.service';
export declare class PositionToGameController {
    private posToGameService;
    constructor(posToGameService: PositionToGameService);
    getPosToGame(id: number): void;
    createPosToGame(dto: posToGameCreateionDto): void;
    updatePosToGame(id: number, dto: posToGameUpdateDto): void;
    deletePosToGame(id: number): void;
}
