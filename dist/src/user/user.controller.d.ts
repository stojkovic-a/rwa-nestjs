import { User } from './models/user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(user: User): User;
    getAllUsers(): Promise<User[]>;
}
