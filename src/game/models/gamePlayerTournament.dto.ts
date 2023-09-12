import { PositionToGame } from "src/position-to-game/models";
import { PositionToGameBasic } from "src/position-to-game/models/position-to-game-basic.dto";
import { TournamentBasic } from "src/tournament/models";
import { PlayerDto } from "src/user/models";

export class GamePlayerTournamentPositionDto{
    id:number;
    whitePlayer:PlayerDto;
    blackPlayer:PlayerDto;
    gameDate:Date;
    winnerId:number;
    startingTime:number;
    increment:number;
    gamePgn:string;
    tournament:TournamentBasic;
    positionToGame:PositionToGameBasic[];
}