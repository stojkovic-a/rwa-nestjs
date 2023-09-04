import { Post, Delete, Put, HttpCode, HttpStatus, Body, Controller, Param, ParseIntPipe, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { Public, Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/enum';
import { gameCreationDto, gameUpdateDto } from './models';

@Controller('game')
export class GameController {
    constructor(private gameService: GameService) {
    }

    @Public()//
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public getGame(@Param('id', ParseIntPipe) id: number) {
        return this.gameService.getGame(id);
    }


    @Post()
    @Public()//
    // @Roles(Role.Admin)
    @HttpCode(HttpStatus.CREATED)
    public createGame(@Body() dto: gameCreationDto) {
        return this.gameService.createGame(dto);
    }

    @Public()//
    @Put(":id")
    // @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public updateGame(@Param("id", ParseIntPipe) id: number, @Body() dto: gameUpdateDto) {
        return this.gameService.updateGame(id, dto);
    }

    @Public()//
    @Delete(':id')
    // @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public deleteGame(@Param('id', ParseIntPipe) id: number) {
        return this.gameService.deleteGame(id);
    }


}
