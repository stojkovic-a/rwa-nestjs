import { Game } from "src/game/models/game.entity";
import { Position } from "src/position/models/position.entity";
export declare enum LastColor {
    WHITE = "white",
    BLACK = "black",
    NONE = "none"
}
export declare class PositionToGame {
    id: number;
    moveNumber: number;
    lastColorMove: LastColor;
    whiteTimeLeft: number;
    blackTimeLeft: number;
    position: Position;
    game: Game;
}
