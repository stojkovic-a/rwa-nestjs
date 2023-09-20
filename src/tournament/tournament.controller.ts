import { Get, ParseIntPipe, Post, Delete, Put, HttpCode, HttpStatus, Body, Controller, Param } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { Role } from 'src/auth/enum';
import { TournamentUpdateDto, tournamentCreationDto } from './models';
import { GetCurrentUserId, Public, Roles } from 'src/auth/decorator';

@Controller('tournament')
export class TournamentController {
    constructor(private tournamentService: TournamentService) {

    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public getTournament(@Param('id', ParseIntPipe) id: number) {
        return this.tournamentService.getTournament(id);
    }

    @Get('tournaments/numberOf')
    @HttpCode(HttpStatus.OK)
    public getNumberOfTournaments() {
        return this.tournamentService.getNumberOfTournaments();
    }

    @Get('pagination/:skip/:take')
    @HttpCode(HttpStatus.OK)
    public getTournamentsPagination(
        @Param('skip', ParseIntPipe) skip: number,
        @Param('take', ParseIntPipe) take: number
    ) {
        return this.tournamentService.getTournamentsPagination(skip, take);
    }

    @Post()
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.CREATED)
    public createTournament(@Body() dto: tournamentCreationDto) {
        return this.tournamentService.createTournament(dto);
    }

    @Put(':id')
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public updateTournament(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: TournamentUpdateDto,
    ) {
        return this.tournamentService.updateTournament(id, dto);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public deleteTournament(@Param('id', ParseIntPipe) id: number) {
        return this.tournamentService.deleteTournament(id);
    }

    @Put("addPlayer/:userId/:tourId")
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public addPlayer(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('tourId', ParseIntPipe) tourId: number,
    ) {
        return this.tournamentService.addPlayer(userId, tourId);
    }

    @Put("removePlayer/:userId/:tourId")
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public removePlayer(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('tourId', ParseIntPipe) tourId: number,
    ) {
        return this.tournamentService.removePlayer(userId, tourId);
    }

    @Put("addSelf/:id")
    @Roles(Role.Player)
    @HttpCode(HttpStatus.OK)
    public addSelf(
        @Param('id', ParseIntPipe) tournamentId: number,
        @GetCurrentUserId() userId: number
    ) {
        return this.tournamentService.addPlayer(userId, tournamentId);
    }

    @Put("removeSelf/:id")
    @Roles(Role.Player)
    @HttpCode(HttpStatus.OK)
    public removeSelf(
        @Param('id', ParseIntPipe) tournamentId: number,
        @GetCurrentUserId() userId: number
    ) {
        return this.tournamentService.removePlayer(userId, tournamentId);
    }


    @Put("addGame/:gameId/:tourId")
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public addGame(
        @Param('gameId', ParseIntPipe) gameId: number,
        @Param('tourId', ParseIntPipe) tourId: number,
    ) {
        return this.tournamentService.addGame(gameId, tourId);
    }

    @Put("removeGame/:gameId/:tourId")
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public removeGame(
        @Param('gameId', ParseIntPipe) gameId: number,
        @Param('tourId', ParseIntPipe) tourId: number,
    ) {
        return this.tournamentService.removeGame(gameId, tourId);
    }

}
