import { Position } from './models/position.entity';
import { Repository } from 'typeorm';
export declare class PositionService {
    private positionRepo;
    constructor(positionRepo: Repository<Position>);
}
