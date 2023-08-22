import { Game } from "src/game/models/game.entity";
import { User } from "src/user/models/user.entity";
export declare enum GameType {
    CLASSICAL = "classical",
    RAPID = "rapid",
    BLITZ = "blitz"
}
export declare class Tournament {
    id: number;
    startingDate: Date;
    endingDate: Date;
    gamesType: GameType;
    games: Game[];
    players: User[];
}
