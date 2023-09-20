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

    public async getNumberOfUsers() {
        return await this.userRepo.count();
    }

    public async getUsersPagination(skip: number, take: number) {
        const users = await this.userRepo.find({
            skip: skip,
            take: take
        });
        const safeUsers = users.map((user) => {
            const { passwordHash, verificationCode, refreshTokenHash, ...rest } = user;
            return {
                ...rest,
                isPlayer: rest.roles.includes(Role.Player),
                isAdmin: rest.roles.includes(Role.Admin)
            }
        });

        return safeUsers;
    }

    public async getPlayer(id: number) {
        const user = await this.userRepo.findOneBy({ id: id });
        if (user.roles.includes(Role.Player)) {
            return user
        }
        throw new NotFoundException("User not Found");
    }

    public async getParticipationsPagination(skip: number, take: number) {
        const usersParticipation = await this.userRepo.find({
            relations: {
                tournamentParticipations: true,
            },
        });

        const result = await Promise.all(
            usersParticipation.map(async (user) => {
                const participations = await user.tournamentParticipations;
                if (participations.length !== 0) {
                    return participations.map((particip) => ({
                        userId: user.id,
                        tournamentId: particip.id,
                    }));
                }
                return [];
            })
        );

        const flattenedResult = result.flat().slice(skip, skip + take);

        return flattenedResult;
    }

    public async countParticipations() {
        const usersParticipation = await this.userRepo.find({
            relations: {
                tournamentParticipations: true,
            },
        });

        const result = await Promise.all(
            usersParticipation.map(async (user) => {
                const participations = await user.tournamentParticipations;
                if (participations.length !== 0) {
                    return participations.map((particip) => ({
                        playerId: user.id,
                        tournamentId: particip.id,
                    }));
                }
                return [];
            })
        );

        const flattenedResult = result.flat();

        return flattenedResult.length;
    }

    public async updateUser(id: number, dto: UserDto) {
        const user = {
            ...dto,
            roles: [Role.User, dto.isAdmin ? Role.Admin : null, dto.isPlayer ? Role.Player : null]
        }
        delete user.isAdmin;
        delete user.isPlayer;
        await this.userRepo.update(id, user);
        return id;
    }

    public async deleteUser(id: number) {
        await this.userRepo.delete(id);
        return id;
    }

}
