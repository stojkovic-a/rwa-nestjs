import { Game } from "src/game/models/game.entity";
import { Position } from "src/position/models/position.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum LastColor {
    WHITE = 'white',
    BLACK = 'black',
    NONE = 'none'
}

@Entity()
export class PositionToGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    moveNumber: number;

    @Column({
        type: 'enum',
        enum: LastColor,
        default: LastColor.NONE
    })
    lastColorMove: LastColor;

    @Column()
    whiteTimeLeft: number;

    @Column()
    blackTimeLeft: number;

    @ManyToOne(()=>Position,(pos)=>pos.positionToGame)
    position:Position;

    @ManyToOne(()=>Game,(game)=>game.positionToGame,{
        lazy:true,
        onDelete:"CASCADE",
        cascade:true
    })
    game:Game;
}