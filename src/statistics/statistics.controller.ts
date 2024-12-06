import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsEntity } from '../database/entities/statistics.entity';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  /**
   * Récupère les statistiques d'un utilisateur spécifique.
   * @param userId L'identifiant de l'utilisateur.
   */
  @Get('user/:userId')
  async getUserStatistics(@Param('userId') userId: string): Promise<StatisticsEntity> {
    try {
      return await this.statisticsService.getUserStatistics(userId);
    } catch (error) {
      throw new HttpException(
        error.message || "Erreur lors de la récupération des statistiques de l'utilisateur.",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Récupère les statistiques globales pour tous les utilisateurs.
   */
  @Get('global')
  async getGlobalStatistics(): Promise<any> {
    try {
      return await this.statisticsService.getGlobalStatistics();
    } catch (error) {
      throw new HttpException(
        error.message || 'Erreur lors de la récupération des statistiques globales.',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
