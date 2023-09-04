import { Game } from "src/game/models/game.entity";
import { User } from "src/user/models/user.entity";
export declare enum GameType {
    CLASSICAL = "classical",
    RAPID = "rapid",
    BLITZ = "blitz"
}
export declare class Tournament {
    id: number;
    tournamentName: string;
    startingDate: Date;
    endingDate: Date;
    gamesType: GameType;
    minElo: number;
    games: Game[];
    players: User[];
}
