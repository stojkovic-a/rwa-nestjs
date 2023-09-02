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
    TypeOrmModule.forRoot(typeOrmConfig),
    PositionToGameModule,
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
  ]
})
export class AppModule { }
