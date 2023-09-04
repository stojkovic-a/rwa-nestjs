import { PositionToGame } from './models/position-to-game.entity';
import { Repository } from 'typeorm';
import { posToGameCreateionDto } from './models';
export declare class PositionToGameService {
    private posToGameRepo;
    constructor(posToGameRepo: Repository<PositionToGame>);
    getPosToGame(id: number): Promise<PositionToGame>;
    deletePosToGame(id: number): Promise<import("typeorm").DeleteResult>;
    createPosToGame(dto: posToGameCreateionDto): Promise<PositionToGame>;
    async: any;
}
