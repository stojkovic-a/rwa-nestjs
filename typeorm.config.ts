import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "src/game/models/game.entity";
import { PositionToGame } from "src/position-to-game/models/position-to-game.entity";
import { Position } from "src/position/models/position.entity";
import { Tournament } from "src/tournament/models/tournament.entity";
import { User } from "src/user/models/user.entity";

export const typeOrmConfig:TypeOrmModule={
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'mysecretpassword',
    database:'chess',
    entities:[User,Game,Tournament,Position,PositionToGame],
    synchronize:true,
}