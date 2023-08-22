import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { Tournament } from './models/tournament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Tournament])],
  controllers: [TournamentController],
  providers: [TournamentService]
})
export class TournamentModule {}
