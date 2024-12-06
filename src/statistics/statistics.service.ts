import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticsEntity } from '../database/entities/statistics.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StatisticsService {
  private readonly cacheUrl = process.env.CACHE_URL || 'http://localhost:3000/api/v1/caches';

  constructor(
    @InjectRepository(StatisticsEntity)
    private readonly statisticsRepository: Repository<StatisticsEntity>,
    private readonly httpService: HttpService,
  ) {}

  /**
   * Récupère les statistiques d'un utilisateur via le service des caches.
   */
  async getUserStatistics(userId: string): Promise<StatisticsEntity> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.cacheUrl}/${userId}`),
      );

      if (!response.data) {
        throw new HttpException('Données introuvables', HttpStatus.NOT_FOUND);
      }

      const statistics = this.calculateStatistics(response.data);
      return await this.saveStatistics(userId, statistics);
    } catch (error) {
      throw new HttpException(
        `Erreur lors de la récupération des statistiques : ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Calcule les statistiques à partir des interactions récupérées.
   */
  private async calculateStatistics(data: any) {
    if (!data || !data.value) {
      throw new Error("Les données ou la valeur des interactions sont manquantes.");
    }
    
    
    // console.log(interactions);
    console.log("aaaaaaaaa",data);
   
    

    
    try {
      // Désérialisation de `value` s'il s'agit d'une chaîne JSON
      // interactions = JSON.parse(data.value);
      // console.log("aaaaaaaaaaaa",interactions[0]);
      
    } catch (error) {
      throw new Error("Impossible de parser la valeur des interactions.");
    }
    // console.log(interactions);
    
    // if (!Array.isArray(interactions)) {
    //   throw new Error("Les interactions désérialisées ne sont pas un tableau.");
    // }
  
    // // Extraire les catégories et actions
    // const allCategories = interactions.map((interaction) => interaction.category);
    // const allActions = interactions.map((interaction) => interaction.action);
  
    // const categoryBreakdown = this.groupBy(allCategories);
    // const actionBreakdown = this.groupBy(allActions);
  
    // const totalInteractions = interactions.length;
    // const uniqueActions = new Set(allActions).size;
    // const uniqueCategories = new Set(allCategories).size;
  
    // const timestamps = interactions.map((item) => new Date(item.time).getTime());
    // const earliestInteraction = new Date(Math.min(...timestamps));
    // const latestInteraction = new Date(Math.max(...timestamps));
    // const durationInHours =
    //   (Math.max(...timestamps) - Math.min(...timestamps)) / (1000 * 60 * 60);
    // const interactionsPerHour = totalInteractions / (durationInHours || 1);
  
    // return {
    //   categoryBreakdown,
    //   actionBreakdown,
    //   totalInteractions,
    //   uniqueActions,
    //   uniqueCategories,
    //   timespan: { earliestInteraction, latestInteraction },
    //   interactionsPerHour,
    // };
  }
  

  /**
   * Enregistre les statistiques calculées dans la base de données.
   */
  private async saveStatistics(
    userId: string,
    stats: any,
  ): Promise<StatisticsEntity> {
    const entity = StatisticsEntity.fromStatistics({
      userId,
      ...stats,
    });

    return await this.statisticsRepository.save(entity);
  }

  /**
   * Regroupe les données et calcule leur occurrence.
   */
  private groupBy(data: string[]): Record<string, number> {
    return data.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Récupère les statistiques globales pour tous les utilisateurs.
   */
  async getGlobalStatistics(): Promise<any> {
    try {
      const response = await lastValueFrom(this.httpService.get(this.cacheUrl));

      if (!response.data) {
        throw new HttpException('Données introuvables', HttpStatus.NOT_FOUND);
      }

      return this.calculateGlobalStatistics(response.data);
    } catch (error) {
      throw new HttpException(
        `Erreur lors de la récupération des statistiques globales : ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Calcule les statistiques globales.
   */
  private calculateGlobalStatistics(data: any[]): any {
    const allCategories = data.flatMap((item) => item.values.map((v) => v.category));
    const allActions = data.flatMap((item) => item.values.map((v) => v.action));
    const totalInteractions = allCategories.length;

    const categoryBreakdown = this.groupBy(allCategories);
    const actionBreakdown = this.groupBy(allActions);

    return {
      totalInteractions,
      uniqueUsers: data.length,
      categoryBreakdown,
      actionBreakdown,
    };
  }
}
