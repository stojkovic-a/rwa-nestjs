import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from 'src/tournament/models';
import { User } from 'src/user/models';
import { MiscController } from './misc.controller';
import { MiscService } from './misc.service';

@Module({
imports:[
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Tournament])
],
controllers:[MiscController],
providers:[MiscService]

})
export class MiscModule {
}
