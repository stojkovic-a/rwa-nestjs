import { PositionToGame } from "src/position-to-game/models/position-to-game.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Position{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        unique:true
    })
    position:string;

    @OneToMany(()=>PositionToGame,(ptg)=>ptg.position,{
        lazy:true
    })
    positionToGame:PositionToGame[];

}
