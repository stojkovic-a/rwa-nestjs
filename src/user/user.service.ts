import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './models';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/enum';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepo: Repository<User>) {

    }

    public getAllUsers() {
        return this.userRepo.find();
    }

    public async getPlayer(id:number){
        const user=await this.userRepo.findOneBy({id:id});
        if(user.roles.includes(Role.Player)){
            return user
        }  
        throw new NotFoundException("User not Found");
    }

    public async updateUser(id:number,dto: UserDto) {
        return await this.userRepo.update(id,dto);
    }

    public async deleteUser(id: number) {
        return await this.userRepo.delete(id);
    }

}
