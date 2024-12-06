import { Controller, Get, Param, HttpException, HttpStatus, Body, Post } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsEntity } from '../database/entities/statistics.entity';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  /**
   * Récupère les statistiques d'un utilisateur spécifique.
   * @param userId L'identifiant de l'utilisateur.
   */


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

  @Get('/:userId')
  async saveStat(@Param('userId') userId: string){
    try {
      return await this.statisticsService.calculateStatistics(userId);
      } catch (error) {
        throw new HttpException(
          error.message || "Erreur lors de la sauvegarde des statistiques de l'utilisateur.",
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
  }



  @Post()
  async saveStats(@Body() statistics: StatisticsEntity): Promise<any> {
    try {
      return await this.statisticsService.saveStatistics2(statistics);
      } catch (error) {
        throw new HttpException(
          error.message || "Erreur lors de la sauvegarde des statistiques.",
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
  }


}
