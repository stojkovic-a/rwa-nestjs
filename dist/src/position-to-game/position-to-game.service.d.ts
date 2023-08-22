import { PositionToGame } from './models/position-to-game.entity';
import { Repository } from 'typeorm';
export declare class PositionToGameService {
    private posToGameRepo;
    constructor(posToGameRepo: Repository<PositionToGame>);
}
