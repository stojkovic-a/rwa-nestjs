import { GameType } from "./tournament.entity";

export class TournamentBasic{
    id:number;
    tournamentName:string;
    startingDate:Date;
    endingDate?:Date;
    gamesType:GameType;
    minElo:number;

}