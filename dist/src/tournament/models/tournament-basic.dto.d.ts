import { GameType } from "./tournament.entity";
export declare class TournamentBasic {
    id: number;
    tournamentName: string;
    startingDate: Date;
    endingDate?: Date;
    gamesType: GameType;
    minElo: number;
}
