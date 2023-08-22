import { Module } from '@nestjs/common';
import { PositionToGameController } from './position-to-game.controller';
import { PositionToGameService } from './position-to-game.service';
import { PositionToGame } from './models/position-to-game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([PositionToGame])],
  controllers: [PositionToGameController],
  providers: [PositionToGameService]
})
export class PositionToGameModule {}
