import { Game } from './models/game.entity';
import { Repository } from 'typeorm';
export declare class GameService {
    private gameRepo;
    constructor(gameRepo: Repository<Game>);
}
