import { PositionToGame } from "src/position-to-game/models/position-to-game.entity";
export declare enum LastColor {
    WHITE = "white",
    BLACK = "black",
    NONE = "none"
}
export declare class Position {
    id: number;
    position: string;
    positionToGame: PositionToGame[];
}
