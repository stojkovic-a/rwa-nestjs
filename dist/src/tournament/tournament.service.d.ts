import { ForbiddenException } from '@nestjs/common';
import { Tournament } from './models/tournament.entity';
import { Repository } from 'typeorm';
import { TournamentUpdateDto, tournamentCreationDto } from './models';
import { User } from 'src/user/models';
export declare class TournamentService {
    private tournamentRepo;
    private userRepo;
    constructor(tournamentRepo: Repository<Tournament>, userRepo: Repository<User>);
    getTournament(id: number): Promise<Tournament>;
    deleteTournament(id: number): Promise<import("typeorm").DeleteResult>;
    createTournament(dto: tournamentCreationDto): Promise<Tournament>;
    updateTournament(id: number, dto: TournamentUpdateDto): Promise<import("typeorm").UpdateResult>;
    addPlayer(userId: number, tourId: number): Promise<Tournament | ForbiddenException>;
    removePlayer(userId: number, tourId: number): Promise<Tournament>;
}
