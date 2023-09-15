import { Module } from '@nestjs/common';
import { PositionToGameController } from './position-to-game.controller';
import { PositionToGameService } from './position-to-game.service';
import { PositionToGame } from './models/position-to-game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionService } from 'src/position/position.service';
import { Position } from 'src/position/models';
import { Game } from 'src/game/models';

@Module({
  imports: [
    TypeOrmModule.forFeature([PositionToGame]),
    TypeOrmModule.forFeature([Position]),
    TypeOrmModule.forFeature([Game]),
  ],
  controllers: [PositionToGameController],
  providers: [PositionToGameService]
})
export class PositionToGameModule { }
