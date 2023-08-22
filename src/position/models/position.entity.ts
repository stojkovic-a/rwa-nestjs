import { PositionToGame } from "src/position-to-game/models/position-to-game.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum LastColor{
    WHITE='white',
    BLACK='black',
    NONE='none'
}

@Entity()
export class Position{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    position:string;

    @OneToMany(()=>PositionToGame,(ptg)=>ptg.position)
    positionToGame:PositionToGame[];

}
