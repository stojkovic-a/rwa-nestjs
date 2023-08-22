import { Game } from "src/game/models/game.entity";
import { Tournament } from "src/tournament/models/tournament.entity";
export declare class User {
    id: number;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    representingCountry: string;
    classicalELo: number;
    rapidElo: number;
    bltizElo: number;
    isAdmin: boolean;
    isPlayer: boolean;
    accountVerified: boolean;
    tournamentParticipations: Tournament[];
    whiteGames: Game[];
    blackGames: Game[];
}
