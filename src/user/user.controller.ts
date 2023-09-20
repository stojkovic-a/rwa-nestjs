import { Controller, Get, Param, Post, Body, Delete, Put, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { User, UserDto } from './models';
import { UserService } from './user.service';
import { GetUser, Public, Roles } from '../auth/decorator';
import { Role } from 'src/auth/enum';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {

    }

    @Get('me')
    getMe(
        @GetUser() user: User,
    ) {
        return user;
    }

    @Get('numberUsers')
    @HttpCode(HttpStatus.OK)
    public getNumberOfUsers() {
        return this.userService.getNumberOfUsers();
    }

    @Get('users/:skip/:take')
    @HttpCode(HttpStatus.OK)
    public getUsersPagination(
        @Param('skip', ParseIntPipe) skip: number,
        @Param('take', ParseIntPipe) take: number
    ) {
        return this.userService.getUsersPagination(skip, take);
    }

    @Get()
    @Roles(Role.Admin)
    public async getAllUsers() {
        return this.userService.getAllUsers();
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public getPlayer(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getPlayer(id);
    }

    @Get('participation/users/tournaments/:skip/:take')
    @HttpCode(HttpStatus.OK)
    public getParticipationsPagination(
        @Param('skip', ParseIntPipe) skip: number,
        @Param('take', ParseIntPipe) take: number
    ) {
        return this.userService.getParticipationsPagination(skip, take);
    }

    @Get('participation/count')
    @HttpCode(HttpStatus.OK)
    public countParticipations() {
        return this.userService.countParticipations();
    }
    @Put(':id')
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public async updateUser(
        @Param("id", ParseIntPipe) id: number,
        @Body() dto: UserDto
    ) {
        return this.userService.updateUser(id, dto);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public async deleteUser(@Param("id", ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }



}
