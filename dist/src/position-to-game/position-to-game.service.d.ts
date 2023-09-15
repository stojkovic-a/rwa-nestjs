import { PositionToGame } from './models/position-to-game.entity';
import { Repository } from 'typeorm';
import { GamePosNum, posToGameCreateionDto, posToGameUpdateDto } from './models';
import { Game } from 'src/game/models';
import { Position } from 'src/position/models';
export declare class PositionToGameService {
    private posToGameRepo;
    private positionRepo;
    private gameRepo;
    constructor(posToGameRepo: Repository<PositionToGame>, positionRepo: Repository<Position>, gameRepo: Repository<Game>);
    getPosToGame(id: number): Promise<PositionToGame>;
    getNumberOfGamesByPosition(pos: string): Promise<number | any[]>;
    getGameByPosition(pos: string, pageNum: number, pageSize: number): Promise<GamePosNum[]>;
    deletePosToGame(id: number): Promise<import("typeorm").DeleteResult>;
    createPosToGame(dto: posToGameCreateionDto): Promise<PositionToGame>;
    updatePosToGame(id: number, dto: posToGameUpdateDto): Promise<import("typeorm").UpdateResult>;
}
