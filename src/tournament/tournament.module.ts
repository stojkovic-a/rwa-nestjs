import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { Tournament } from './models/tournament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/models';
import { Game } from 'src/game/models';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Game],)
  ],
  controllers: [TournamentController],
  providers: [TournamentService]
})
export class TournamentModule { }
