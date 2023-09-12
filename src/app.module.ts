import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { TournamentModule } from './tournament/tournament.module';
import { PositionModule } from './position/position.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { PositionToGameModule } from './position-to-game/position-to-game.module';
import { ConfigModule } from '@nestjs/config';
import { AtGuard, RolesGuard } from './auth/guard';
import { APP_GUARD } from '@nestjs/core'
import { MiscController } from './misc/misc.controller';
import { MiscService } from './misc/misc.service';
import { MiscModule } from './misc/misc.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UserModule,
    GameModule,
    TournamentModule,
    PositionModule,
    MiscModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    PositionToGameModule,
    MiscModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule { }
