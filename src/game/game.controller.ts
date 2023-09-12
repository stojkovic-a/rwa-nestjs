import { Post, Delete, Put, HttpCode, HttpStatus, Body, Controller, Param, ParseIntPipe, Get } from '@nestjs/common';
import { GameService } from './GameService';
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

    @Public()//
    @Post('/pageFilter/:skip/:take')
    @HttpCode(HttpStatus.OK)
    public getGamesPaging(
        @Param('skip', ParseIntPipe) skip: number,
        @Param('take', ParseIntPipe) take: number,
        @Body() params
    ) {

        return this.gameService.getGamesPaging(
            skip,
            take,
            params.params,
        );
    }

    @Public()//
    @Get('/number/count')
    @HttpCode(HttpStatus.OK)
    public getNumberOfGames() {
        return this.gameService.getNumberOfGames();
    }

    @Public()//
    @Get('/positions/:id')
    @HttpCode(HttpStatus.OK)
    public getPositionsFromGame(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.gameService.getPositionsFromGame(id);
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
