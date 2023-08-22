import { User } from './models/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
}
