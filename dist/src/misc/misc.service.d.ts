import { Tournament } from 'src/tournament/models';
import { User } from 'src/user/models';
import { Repository } from 'typeorm';
export declare class MiscService {
    private userRepo;
    private tournamentRepo;
    constructor(userRepo: Repository<User>, tournamentRepo: Repository<Tournament>);
    getFilters(): Promise<{
        names: string[];
        tournaments: any[];
    }>;
}
