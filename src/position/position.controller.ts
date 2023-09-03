import { Post, Delete, Put, HttpCode, HttpStatus, Body, Controller, Param, ParseIntPipe, Get } from '@nestjs/common';
import { Public, Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/enum';
import { PositionService } from './position.service';

@Controller('position')
export class PositionController {
    constructor(private positionService: PositionService) {

    }
    // @Public()
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    public getPosition(@Param('id', ParseIntPipe) id: number) {
        return this.positionService.getPosition(id);
    }


    @Post()
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.CREATED)
    public addPosition(@Body() pos: string) {
        return this.positionService.addPosition(pos);
    }

    @Delete(":id")
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public deletePosition(@Param('id', ParseIntPipe) id: number) {
        return this.positionService.deletePosition(id);

    }

    @Put(':id/:pos')
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    public updatePosition(@Param('id', ParseIntPipe) id: number, @Param('pos') pos: string) {
        return this.positionService.updatePosition(id, pos);
    }


}