import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticsEntity } from '../database/entities/statistics.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CreateStatisticDTO } from 'src/database/dto/Statistic/Statistic.dto';

@Injectable()
export class StatisticsService {
  private readonly cacheUrl = process.env.CACHE_URL || 'http://localhost:3000/api/v1/caches';

  constructor(
    @InjectRepository(StatisticsEntity)
    private readonly statisticsRepository: Repository<StatisticsEntity>,
    private readonly httpService: HttpService,
  ) {}



   async calculateStatistics(data: any) {
    if (!data || !data.value) {
      throw new Error("Les données ou la valeur des interactions sont manquantes.");
    }
    const interactions = data.value.map(item => ({
      userId: data.userId,
      createdAt: data.createdAt,
      action: item.action,
      category: item.category,
      time: item.time
    }));
    console.log("3asba");
    
    // // Extraire les catégories et actions
     const allCategories = interactions.map((interaction) => interaction.category);
     const allActions = interactions.map((interaction) => interaction.action);
     const categoryBreakdown = this.groupBy(allCategories);
     const actionBreakdown = this.groupBy(allActions);  
     const totalInteractions = interactions.length;
     const uniqueActions = new Set(allActions).size;
     const uniqueCategories = new Set(allCategories).size;
     const timestamps = interactions.map((item) => new Date(item.time).getTime());
     const earliestInteraction = new Date(Math.min(...timestamps));
     const latestInteraction = new Date(Math.max(...timestamps));
     const durationInHours =
       (Math.max(...timestamps) - Math.min(...timestamps)) / (1000 * 60 * 60);
     const interactionsPerHour = totalInteractions / (durationInHours || 1);     
     const createdAt = Date.now()
     const stat= {
      "categoryBreakdown":categoryBreakdown,
      "actionBreakdown":actionBreakdown,
      "totalInteractions":totalInteractions,
      "earliestInteraction":earliestInteraction,
      "latestInteraction":latestInteraction,
      //  createdAt,
      "uniqueActions":uniqueActions,
      "uniqueCategories":uniqueCategories,
      "interactionsPerHour": interactionsPerHour,
     };
     console.log("zaq",stat);
     return  stat
     
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


  async saveStatistics2(data: any) {
    try {
      // Calcul des statistiques
      const newStat = await this.calculateStatistics(data);
      console.log("Statistics calculated:", newStat);

      // Enregistrement des statistiques
          return this.create(newStat)
    } catch (err) {
      // Gestion des erreurs
      console.error("Error saving statistics:", err);
      throw new Error("Failed to save statistics.");
    }
  }
  
  async create (createStatisticDto : any){
    try {
      const newStatistic = await this.statisticsRepository.save(createStatisticDto);
      return newStatistic;
      } catch (error) {
        throw new HttpException(
          `Erreur lors de la création d'une statistique : ${error.message
            }`
            ,
            HttpStatus.INTERNAL_SERVER_ERROR
            );
            }
    }


  




}
