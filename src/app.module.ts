import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { TournamentModule } from './tournament/tournament.module';
import { PositionModule } from './position/position.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { PositionToGameModule } from './position-to-game/position-to-game.module';


@Module({
  imports: [
    AuthModule,
    UserModule,
    GameModule,
    TournamentModule,
    PositionModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    PositionToGameModule,
  ]
})
export class AppModule { }
