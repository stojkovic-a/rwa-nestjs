import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { Tournament } from './models/tournament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/models';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament]),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [TournamentController],
  providers: [TournamentService]
})
export class TournamentModule { }
