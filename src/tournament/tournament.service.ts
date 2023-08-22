import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './models/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentService {

    constructor(@InjectRepository(Tournament) private tournamentRepo:Repository<Tournament>){
        
    }
}
