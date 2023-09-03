import { IsEmail,IsString,IsNotEmpty,IsNumber, IsBoolean , IsDateString, IsArray, ValidateBy, ValidateIf} from "class-validator";


export class gameCreationDto{
    @IsNumber()
    @IsNotEmpty()
    whitePlayerId:number;

    @IsNumber()
    @IsNotEmpty()
    blackPlayerId:number;

    @IsDateString()
    @IsNotEmpty()
    gameDate:Date;

    @IsNumber()
    @IsNotEmpty()
    winnerId:number

    @IsNumber()
    @IsNotEmpty()
    startingTime:number;

    @IsNumber()
    @IsNotEmpty()
    increment:number;

    @IsArray()
    @IsNotEmpty()
    gamePGN:string[];

    tournamentId:number;

}

export class gameUpdateDto{
    @IsNumber()
    @ValidateIf((object,value)=>value!=null)
    whitePlayerId:number;

    @IsNumber()
    @ValidateIf((object,value)=>value!=null)
    blackPlayerId:number;

    @IsDateString()
    @ValidateIf((object,value)=>value!=null)
    gameDate:Date;

    @ValidateIf((object,value)=>value!=null)
    @IsNumber()
    winnerId:number

    @IsNumber()
    @ValidateIf((object,value)=>value!=null)
    startingTime:number;

    @IsNumber()
    @ValidateIf((object,value)=>value!=null)
    increment:number;

    @IsArray()
    @ValidateIf((object,value)=>value!=null)
    gamePGN:string[];

    tournamentId:number;
}