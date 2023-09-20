import { User, UserDto } from './models';
import { UserService } from './user.service';
import { Role } from 'src/auth/enum';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(user: User): User;
    getNumberOfUsers(): Promise<number>;
    getUsersPagination(skip: number, take: number): Promise<{
        isPlayer: boolean;
        isAdmin: boolean;
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        dateOfBirth: Date;
        representingCountry: string;
        classicalElo: number;
        rapidElo: number;
        blitzElo: number;
        roles: Role[];
        accountVerified: boolean;
        registrationDateTime: Date;
        tournamentParticipations: import("../tournament/models").Tournament[];
        whiteGames: import("../game/models").Game[];
        blackGames: import("../game/models").Game[];
    }[]>;
    getAllUsers(): Promise<User[]>;
    getPlayer(id: number): Promise<User>;
    getParticipationsPagination(skip: number, take: number): Promise<{
        userId: number;
        tournamentId: number;
    }[]>;
    countParticipations(): Promise<number>;
    updateUser(id: number, dto: UserDto): Promise<number>;
    deleteUser(id: number): Promise<number>;
}
