import { GamePlayerTournamentPositionDto } from "src/game/models";

export class GamePosNum {

    games: GamePlayerTournamentPositionDto;
    moveNums: number;

    constructor(games:GamePlayerTournamentPositionDto,moveNumes:number){
        this.games=games;
        this.moveNums=moveNumes;
    }
}