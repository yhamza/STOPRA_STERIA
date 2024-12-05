import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // Route pour calculer les statistiques d'un utilisateur
  @Get('user/:userId')
  async calculateUserStatistics(@Param('userId') userId: string) {
    return this.statisticsService.calculateUserStatistics(userId);
  }

  // Route pour calculer les statistiques globales
  @Get('global')
  async calculateGlobalStatistics() {
    return this.statisticsService.calculateGlobalStatistics();
  }
}
