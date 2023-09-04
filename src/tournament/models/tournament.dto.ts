import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";
import { GameType } from "./tournament.entity";

export class tournamentCreationDto {
    @IsString()
    @IsNotEmpty()
    tournamentName: string;

    @IsDateString()
    @IsNotEmpty()
    startingDate: Date;

    @IsDateString()
    @ValidateIf((object, value) => value != null)
    endingDate: Date;

    @IsEnum(GameType)
    @IsNotEmpty()
    gamesType: GameType;

    @IsNumber()
    @IsNotEmpty()
    minElo: number;
}

export class TournamentUpdateDto {
    @IsString()
    @ValidateIf((object, value) => value != null)
    tournamentName: string;

    @IsDateString()
    @ValidateIf((object, value) => value != null)
    startingDate: Date;

    @IsDateString()
    @ValidateIf((object, value) => value != null)
    endingDate: Date;

    @IsEnum(GameType)
    @ValidateIf((object, value) => value != null)
    gamesType: GameType;

    @IsNumber()
    @ValidateIf((object, value) => value != null)
    minElo: number;
}