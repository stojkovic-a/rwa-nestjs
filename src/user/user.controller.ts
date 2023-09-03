import { Controller, Get, Param, Post, Body, Delete, Put, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { User, UserDto } from './models';
import { UserService } from './user.service';
import { GetUser, Roles } from '../auth/decorator';
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

    @Get()
    @Roles(Role.Admin, Role.Player)
    public async getAllUsers() {
        return this.userService.getAllUsers();
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public getPlayer(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getPlayer(id);
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
