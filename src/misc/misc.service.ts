import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from 'src/tournament/models';
import { User } from 'src/user/models';
import { Repository } from 'typeorm';

@Injectable()
export class MiscService {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Tournament) private tournamentRepo: Repository<Tournament>,

    ) {

    }

    public async getFilters() {
        const playerNames = await this.userRepo
            .createQueryBuilder('user')
            .select('user.firstName, user.lastName')
            .getRawMany();
        const tournamentNames = await this.tournamentRepo
            .createQueryBuilder('tournament')
            .select('tournament.tournamentName')
            .getRawMany();
        const names= playerNames.map((result) => {return `${result.firstName} ${result.lastName}`})
        const tournaments=tournamentNames.map((result)=>result.tournamentName)
        return {names,tournaments};
    }

}
