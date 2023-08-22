import { Injectable } from '@nestjs/common';
import { Game } from './models/game.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GameService {

    constructor(@InjectRepository(Game) private gameRepo: Repository<Game>) {

    }
}
