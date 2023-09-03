import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './models';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    getAllUsers(): Promise<User[]>;
    getPlayer(id: number): Promise<User>;
    updateUser(id: number, dto: UserDto): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
