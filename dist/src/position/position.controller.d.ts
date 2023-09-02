import { PositionService } from './position.service';
export declare class PositionController {
    private positionService;
    constructor(positionService: PositionService);
    getPosition(id: number): Promise<import("./models/position.entity").Position>;
    addPosition(pos: string): Promise<import("./models/position.entity").Position>;
    deletePosition(id: number): Promise<import("typeorm").DeleteResult>;
    updatePosition(id: number, pos: string): Promise<import("typeorm").UpdateResult>;
}
