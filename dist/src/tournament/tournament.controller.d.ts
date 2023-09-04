import { TournamentService } from './tournament.service';
import { TournamentUpdateDto, tournamentCreationDto } from './models';
export declare class TournamentController {
    private tournamentService;
    constructor(tournamentService: TournamentService);
    getTournament(id: number): Promise<import("./models").Tournament>;
    createTournament(dto: tournamentCreationDto): Promise<import("./models").Tournament>;
    updateTournament(id: number, dto: TournamentUpdateDto): Promise<import("typeorm").UpdateResult>;
    deleteTournament(id: number): Promise<import("typeorm").DeleteResult>;
    addPlayer(userId: number, tourId: number): Promise<import("./models").Tournament | import("@nestjs/common").ForbiddenException>;
    removePlayer(userId: number, tourId: number): Promise<import("./models").Tournament>;
    addSelf(tournamentId: number, userId: number): Promise<import("./models").Tournament | import("@nestjs/common").ForbiddenException>;
    removeSelf(tournamentId: number, userId: number): Promise<import("./models").Tournament>;
    addGame(gameId: number, tourId: number): Promise<import("./models").Tournament>;
    removeGame(gameId: number, tourId: number): Promise<import("./models").Tournament>;
}
