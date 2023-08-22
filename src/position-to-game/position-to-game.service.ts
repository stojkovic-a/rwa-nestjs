import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PositionToGame } from './models/position-to-game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PositionToGameService {

    constructor(@InjectRepository(PositionToGame) private posToGameRepo:Repository<PositionToGame>){
        
    }
}

