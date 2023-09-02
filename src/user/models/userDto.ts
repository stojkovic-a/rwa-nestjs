import { IsBoolean, IsDateString, IsNumber, IsString } from "class-validator";

export class UserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsDateString()
    dateOfBirth: Date;

    @IsString()
    representingCountry: string;

    @IsNumber()
    classicalElo: number;

    @IsNumber()
    rapidElo: number;

    @IsNumber()
    blitzElo: number;

    @IsBoolean()
    isPlayer:boolean;

    @IsBoolean()
    isAdmin:boolean;
}