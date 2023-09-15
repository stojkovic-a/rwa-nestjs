import { ParseIntPipe, Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Body, Param } from '@nestjs/common';
import { Public, Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/enum';
import { posToGameCreateionDto, posToGameUpdateDto } from './models';
import { PositionToGameService } from './position-to-game.service';

@Controller('position-to-game')
export class PositionToGameController {
    constructor(private posToGameService: PositionToGameService) {
    }

    @Get(':id')
    @Public()//
    // @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public getPosToGame(@Param('id', ParseIntPipe) id: number) {
        return this.posToGameService.getPosToGame(id);
    }

    @Post('position')
    @Public()//
    @HttpCode(HttpStatus.OK)
    public getGameByPosition(
        @Body() params,
    ) {
        return this.posToGameService.getGameByPosition(
            params.params.position,
            params.params.pageNum,
            params.params.pageSize
        );
    }

    @Post('positionNum')
    @Public()//
    @HttpCode(HttpStatus.OK)
    public getNumberOfGamesByPosition(
        @Body() params,
    ) {
        return this.posToGameService.getNumberOfGamesByPosition(
            params.params.position
        );
    }
    @Post()
    @Public()//
    // @Roles(Role.Admin)
    @HttpCode(HttpStatus.CREATED)
    public createPosToGame(@Body() dto: posToGameCreateionDto) {
        return this.posToGameService.createPosToGame(dto);
    }

    @Put(':id')
    @Public()//
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public updatePosToGame(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: posToGameUpdateDto,
    ) {
        return this.posToGameService.updatePosToGame(id, dto);
    }

    @Delete(':id')
    @Public()//
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public deletePosToGame(@Param('id', ParseIntPipe) id: number) {
        return this.posToGameService.deletePosToGame(id);
    }
}
