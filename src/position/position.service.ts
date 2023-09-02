import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './models/position.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PositionService {

    constructor(@InjectRepository(Position) private positionRepo: Repository<Position>) {

    }

    public async getPosition(id: number) {
        return await this.positionRepo.findOneBy({ id: id });
    }

    public async addPosition(positionString: string) {
        const position = this.positionRepo.create(
            { position: positionString });
        return await this.positionRepo.save(position);
    }

    public async deletePosition(id: number) {
        return await this.positionRepo.delete(id);
    }

    public async updatePosition(id:number, posString:string){
        return await this.positionRepo.update(id,{
            position:posString
        });
    }
}
