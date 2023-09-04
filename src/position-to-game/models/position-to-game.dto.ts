import { IsEnum, IsNotEmpty, IsNumber, ValidateIf } from "class-validator";
import { LastColor } from "./position-to-game.entity";

export class posToGameCreateionDto {
    @IsNumber()
    @IsNotEmpty()
    moveNumber: number;

    @IsEnum(LastColor)
    @IsNotEmpty()
    lastColorMove: LastColor;

    @IsNumber()
    @IsNotEmpty()
    whiteTimeLeft: number;

    @IsNumber()
    @IsNotEmpty()
    blackTimeLeft: number;
}

export class posToGameUpdateDto{
    @IsNumber()
    @ValidateIf((object, value) => value!=null)
    moveNumber: number;

    @IsEnum(LastColor)
    @ValidateIf((object, value) => value!=null)
    lastColorMove: LastColor;

    @IsNumber()
    @ValidateIf((object, value) => value!=null)
    whiteTimeLeft: number;

    @IsNumber()
    @ValidateIf((object, value) => value!=null)
    blackTimeLeft: number;
}