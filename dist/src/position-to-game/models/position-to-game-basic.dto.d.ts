import { positionDto } from "src/position/models";
import { LastColor } from "./position-to-game.entity";
export declare class PositionToGameBasic {
    id: number;
    moveNumber: number;
    lastColorMove: LastColor;
    whiteTimeLeft: number;
    blackTimeLeft: number;
    position: positionDto;
}
