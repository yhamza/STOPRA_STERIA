import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsEntity } from '../database/entities/statistics.entity';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
  TypeOrmModule.forFeature([StatisticsEntity]),
  HttpModule
],
  providers: [StatisticsService],
  controllers: [StatisticsController],
  exports: [StatisticsService],
})
export class StatisticsModule {}
