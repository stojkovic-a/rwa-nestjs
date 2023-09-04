import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PositionToGame } from './models/position-to-game.entity';
import { Repository } from 'typeorm';
import { posToGameCreateionDto, posToGameUpdateDto } from './models';

@Injectable()
export class PositionToGameService {

    constructor(@InjectRepository(PositionToGame) private posToGameRepo: Repository<PositionToGame>) {

    }

    public async getPosToGame(id: number) {
        return await this.posToGameRepo.findOneBy({ id: id });
    }

    public async deletePosToGame(id: number) {
        return await this.posToGameRepo.delete(id);
    }

    public async createPosToGame(dto: posToGameCreateionDto) {
        const posToGame = await this.posToGameRepo.create(dto);
        return await this.posToGameRepo.save(posToGame);
    }

    public async updatePosToGame(id: number, dto: posToGameUpdateDto) {
        return await this.posToGameRepo.update(id, dto);
    }

}

