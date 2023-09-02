import { Post, Delete, Put, HttpCode, HttpStatus, Body, Controller, Param, ParseIntPipe, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { Public } from 'src/auth/decorator';

@Controller('game')
export class GameController {
    constructor(private gameService:GameService) {
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public getGame

}
