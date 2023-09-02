import { Position } from './models/position.entity';
import { Repository } from 'typeorm';
export declare class PositionService {
    private positionRepo;
    constructor(positionRepo: Repository<Position>);
    getPosition(id: number): Promise<Position>;
    addPosition(positionString: string): Promise<Position>;
    deletePosition(id: number): Promise<import("typeorm").DeleteResult>;
    updatePosition(id: number, posString: string): Promise<import("typeorm").UpdateResult>;
}
