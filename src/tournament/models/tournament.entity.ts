import { Game } from "src/game/models/game.entity";
import { User } from "src/user/models/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum GameType{
    CLASSICAL='classical',
    RAPID='rapid',
    BLITZ='blitz'
}

@Entity()
export class Tournament{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    startingDate:Date;

    @Column({
        nullable:true
    })
    endingDate:Date;

    @Column({
        type:'enum',
        enum:GameType,
        default:GameType.CLASSICAL
    })
    gamesType:GameType

    @OneToMany(()=>Game,(game)=>game.tournament,{
        lazy:true
    })
    games:Game[];

    @ManyToMany(()=>User,(user)=>user.tournamentParticipations,{
        lazy:true
    })
    players:User[];

}