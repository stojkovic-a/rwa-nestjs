import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { MiscService } from './misc.service';
import { Public } from 'src/auth/decorator';

@Controller('misc')
export class MiscController {
constructor(private miscService:MiscService){

}

@Get()
@HttpCode(HttpStatus.OK)
getFilters(){
    return this.miscService.getFilters();
}

}
