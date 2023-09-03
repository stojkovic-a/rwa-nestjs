import { PositionToGame } from "src/position-to-game/models/position-to-game.entity";
import { Tournament } from "src/tournament/models/tournament.entity";
import { User } from "src/user/models/user.entity";
export declare class Game {
    id: number;
    whitePlayer: User;
    blackPlayer: User;
    gameDate: Date;
    winnerId: number;
    startingTime: number;
    increment: number;
    tournament: Tournament;
    positionToGame: PositionToGame[];
}
