import { Delete } from "@nestjs/common";
import { PositionToGame } from "src/position-to-game/models/position-to-game.entity";
import { Position } from "src/position/models/position.entity";
import { Tournament } from "src/tournament/models/tournament.entity";
import { User } from "src/user/models/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>User,(user)=>user.whiteGames)
    whitePlayer:User;

    @ManyToOne(()=>User,(user)=>user.blackGames)
    blackPlayer:User;

    @Column()
    gameDate:Date;

    @Column({
        nullable:true
    })
    winnerId:number;
    //0 ako je draw

    @Column()
    startingTime:number;

    @Column()
    increment:number;

    @ManyToOne(()=>Tournament,(tournament)=>tournament.games,{
        lazy:true
    })
    tournament:Tournament;

    @OneToMany(()=>PositionToGame,(ptg)=>ptg.game,{
    })
    positionToGame:PositionToGame[];
    
}