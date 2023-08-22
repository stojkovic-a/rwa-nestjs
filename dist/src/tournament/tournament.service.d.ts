import { Tournament } from './models/tournament.entity';
import { Repository } from 'typeorm';
export declare class TournamentService {
    private tournamentRepo;
    constructor(tournamentRepo: Repository<Tournament>);
}
