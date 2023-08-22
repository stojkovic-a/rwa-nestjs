import { IsEmail,IsString,IsNotEmpty,IsNumber, IsBoolean , IsDateString} from "class-validator";

export class SignupDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    @IsString()
    firstName:string;

    @IsNotEmpty()
    @IsString()
    lastName:string;

    @IsDateString()
    dateOfBirth:Date;

    @IsString()
    representingCountry:string;

    @IsNumber()
    classicalElo:number;

    @IsNumber()
    rapidElo:number;

    @IsNumber()
    blitzElo:number;

    @IsNotEmpty()
    @IsBoolean()
    isPlayer:boolean



}