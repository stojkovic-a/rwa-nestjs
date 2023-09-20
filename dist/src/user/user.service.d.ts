import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './models';
import { Role } from 'src/auth/enum';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    getAllUsers(): Promise<User[]>;
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
    getPlayer(id: number): Promise<User>;
    getParticipationsPagination(skip: number, take: number): Promise<{
        userId: number;
        tournamentId: number;
    }[]>;
    countParticipations(): Promise<number>;
    updateUser(id: number, dto: UserDto): Promise<number>;
    deleteUser(id: number): Promise<number>;
}
