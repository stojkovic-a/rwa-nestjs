import { ForbiddenException } from '@nestjs/common';
import { Tournament } from './models/tournament.entity';
import { Repository } from 'typeorm';
import { TournamentUpdateDto, tournamentCreationDto } from './models';
import { User } from 'src/user/models';
import { Game } from 'src/game/models';
export declare class TournamentService {
    private tournamentRepo;
    private userRepo;
    private gameRepo;
    constructor(tournamentRepo: Repository<Tournament>, userRepo: Repository<User>, gameRepo: Repository<Game>);
    getTournament(id: number): Promise<Tournament>;
    deleteTournament(id: number): Promise<import("typeorm").DeleteResult>;
    createTournament(dto: tournamentCreationDto): Promise<Tournament>;
    updateTournament(id: number, dto: TournamentUpdateDto): Promise<import("typeorm").UpdateResult>;
    addPlayer(userId: number, tourId: number): Promise<Tournament | ForbiddenException>;
    removePlayer(userId: number, tourId: number): Promise<Tournament>;
    addGame(gameId: number, tourId: number): Promise<Tournament>;
    removeGame(gameId: number, tourId: number): Promise<Tournament>;
}
