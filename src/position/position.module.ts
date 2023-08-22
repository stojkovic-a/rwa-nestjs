import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { Position } from './models/position.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Position])],
  controllers: [PositionController],
  providers: [PositionService]
})
export class PositionModule {}
