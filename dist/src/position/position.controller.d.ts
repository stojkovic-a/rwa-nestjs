import { PositionService } from './position.service';
export declare class PositionController {
    private positionService;
    constructor(positionService: PositionService);
    getPosition(id: number): Promise<import("./models").Position>;
    addPosition(pos: string): Promise<import("./models").Position>;
    deletePosition(id: number): Promise<import("typeorm").DeleteResult>;
    updatePosition(id: number, pos: string): Promise<import("typeorm").UpdateResult>;
}
