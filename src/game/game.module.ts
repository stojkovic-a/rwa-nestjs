import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './models/game.entity';
import { UserService } from 'src/user/user.service';
import { TournamentService } from 'src/tournament/tournament.service';
import { User } from 'src/user/models';
import { Tournament } from 'src/tournament/models/tournament.entity';
import { Position } from 'src/position/models/position.entity';
import { PositionToGame } from 'src/position-to-game/models/position-to-game.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Tournament]),
    TypeOrmModule.forFeature([Position]),
    TypeOrmModule.forFeature([PositionToGame])
  ],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
