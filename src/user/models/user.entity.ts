import { Role } from "src/auth/enum";
import { Game } from "src/game/models/game.entity";
import { Tournament } from "src/tournament/models/tournament.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        unique:true
    })
    email:string;

    @Column()
    passwordHash:string;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column({
        nullable:true
    })
    dateOfBirth:Date;

    @Column({
        default:"FIDE"
    })
    representingCountry:string

    @Column()
    classicalELo:number;

    @Column()
    rapidElo:number;

    @Column()
    bltizElo:number;

    @Column({
        type: "enum",
        enum: Role,
        default:[Role.User],
        array:true
    })
    roles:Role[]

    @Column({
        default:false
    })
    accountVerified:boolean;

    @Column()
    verificationCode:string;

    @Column()
    registrationDateTime:Date;

    @Column({
        nullable:true
    })
    refreshTokenHash:string;

    @ManyToMany(()=>Tournament,(tournament)=>tournament.players,{
        lazy:true
    })
    @JoinTable()
    tournamentParticipations:Tournament[];

    @OneToMany(()=>Game,(game)=>game.whitePlayer,{
        lazy:true
    })
    whiteGames:Game[];

    @OneToMany(()=>Game,(game)=>game.blackPlayer,{
        lazy:true
    })
    blackGames:Game[];
}