import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './models';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepo: Repository<User>) {

    }

    public getAllUsers() {
        return this.userRepo.find();
    }

    public async updateUser(id:number,dto: UserDto) {
        return await this.userRepo.update(id,dto);
    }

    public async deleteUser(id: number) {
        return await this.userRepo.delete(id);
    }

}
