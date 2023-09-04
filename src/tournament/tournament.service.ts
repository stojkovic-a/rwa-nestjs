import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameType, Tournament } from './models/tournament.entity';
import { Repository } from 'typeorm';
import { TournamentUpdateDto, tournamentCreationDto } from './models';
import { User } from 'src/user/models';
import { Game } from 'src/game/models';

@Injectable()
export class TournamentService {

    constructor(
        @InjectRepository(Tournament) private tournamentRepo: Repository<Tournament>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Game) private gameRepo: Repository<Game>,
    ) {

    }

    public async getTournament(id: number) {
        return await this.tournamentRepo.findOneBy({ id: id });
    }

    public async deleteTournament(id: number) {
        return await this.tournamentRepo.delete(id);
    }

    public async createTournament(dto: tournamentCreationDto) {
        const tournament = await this.tournamentRepo.create(dto);
        return await this.tournamentRepo.save(tournament);
    }

    public async updateTournament(id: number, dto: TournamentUpdateDto) {
        return await this.tournamentRepo.update(id, dto);
    }

    public async addPlayer(userId: number, tourId: number) {
        const player = await this.userRepo.findOneBy({ id: userId });
        const tournament = await this.tournamentRepo.findOneBy({ id: tourId });
        let canAdd: boolean = false;
        if (
            tournament.gamesType === GameType.CLASSICAL &&
            player.classicalELo >= tournament.minElo
        ) {
            canAdd = true;
        }

        if (
            tournament.gamesType === GameType.RAPID &&
            player.rapidElo >= tournament.minElo
        ) {
            canAdd = true;
        }

        if (
            tournament.gamesType === GameType.BLITZ &&
            player.bltizElo >= tournament.minElo
        ) {
            canAdd = true;
        }
        if (canAdd) {
            const alreadySignedUp = await tournament.players;
            let addedAlready: number = 0;
            addedAlready = alreadySignedUp.filter(p => p.id == player.id).length;
            if (!addedAlready) {
                (await tournament.players).push(player);
                return await this.tournamentRepo.save(tournament);
            }
            return new ForbiddenException("Already added");
        }
        return new ForbiddenException("Elo too low");
    }

    public async removePlayer(userId: number, tourId: number) {
        const player = await this.userRepo.findOneBy({ id: userId });
        const tournament = await this.tournamentRepo.findOneBy({ id: tourId });
        tournament.players = (await tournament.players).filter(p => p.id != player.id);
        return await this.tournamentRepo.save(tournament);
    }



    public async addGame(gameId: number, tourId: number) {
        const game = await this.gameRepo.findOneBy({ id: gameId });
        const tournament = await this.tournamentRepo.findOneBy({ id: tourId });
        let canAdd: boolean = false;
        //proveri da li su oba igraca u turnir 
        (await tournament.games).push(game);
        return await this.tournamentRepo.save(tournament);
    }

    public async removeGame(gameId: number, tourId: number) {
        const game = await this.gameRepo.findOneBy({ id: gameId });
        const tournament = await this.tournamentRepo.findOneBy({ id: tourId });
        tournament.games = (await tournament.games).filter(p => p.id != game.id);
        return await this.tournamentRepo.save(tournament);
    }
}
