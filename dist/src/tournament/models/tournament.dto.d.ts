import { GameType } from "./tournament.entity";
export declare class tournamentCreationDto {
    tournamentName: string;
    startingDate: Date;
    endingDate: Date;
    gamesType: GameType;
    minElo: number;
}
export declare class TournamentUpdateDto {
    tournamentName: string;
    startingDate: Date;
    endingDate: Date;
    gamesType: GameType;
    minElo: number;
}
