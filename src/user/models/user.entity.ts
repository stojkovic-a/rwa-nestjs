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
        default:false
    })
    isAdmin:boolean;

    @Column({
        default:false
    })
    isPlayer:boolean;

    @Column({
        default:false
    })
    accountVerified:boolean;


    @ManyToMany(()=>Tournament,(tournament)=>tournament.players)
    @JoinTable()
    tournamentParticipations:Tournament[];

    @OneToMany(()=>Game,(game)=>game.whitePlayer)
    whiteGames:Game[];

    @OneToMany(()=>Game,(game)=>game.blackPlayer)
    blackGames:Game[];
}