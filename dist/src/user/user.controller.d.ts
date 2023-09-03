import { User, UserDto } from './models';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(user: User): User;
    getAllUsers(): Promise<User[]>;
    getPlayer(id: number): Promise<User>;
    updateUser(id: number, dto: UserDto): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
