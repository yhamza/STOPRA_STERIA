import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticsEntity } from '../database/entities/statistics.entity';
import {calculateStatistics2} from './globalstats'
@Injectable()
export class StatisticsService {
  private   url = process.env.URL || 'http://localhost:3000/api/v1';

  constructor(
    @InjectRepository(StatisticsEntity)
    private readonly statisticsRepository: Repository<StatisticsEntity>,
  ) {}

  // save user stats
  async create (createStatisticDto : any){
    try {
      const newStatistic = await this.statisticsRepository.save(createStatisticDto);

      return newStatistic;
      } catch (error) {
        throw new HttpException(
          `Erreur lors de la création d'une statistique : ${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);}
  }

  // get user stats
  async getUserStat(userId : string){
    try {
      const userStat = await this.statisticsRepository.findOne({where : {userId : userId}});
      return userStat;
      } catch (error) {
        throw new HttpException(`Erreur lors de la récupération des statistiques de l'utilisateur : ${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);}
  }

  //get all user stats
  async getAllUsersStatistics(){
    try {
      const statistics = await this.statisticsRepository.find()
      return statistics
      } catch (error) {
        throw new HttpException(
          `Erreur lors de la récupération des statistiques : ${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
        } 
  }
  
  async getstats(){
    const stats = await this.getAllUsersStatistics()
    return await this.calculateGlobalStats(stats)
  }

  async calculateGlobalStats(stats: any[]): Promise<any> {
    const formattedStats = stats.map((stat) => ({
      id: stat.id,
      userId: stat.userId,
      categoryBreakdown: stat.categoryBreakdown,
      actionBreakdown: stat.actionBreakdown,
      totalInteractions: stat.totalInteractions,
      earliestInteraction: stat.earliestInteraction.toISOString(), 
      latestInteraction: stat.latestInteraction.toISOString(), 
      uniqueActions: stat.uniqueActions,
      uniqueCategories: stat.uniqueCategories,
      interactionsPerHour: stat.interactionsPerHour,
    }));
    return await calculateStatistics2(formattedStats);
  }
  
  
  
  






























  
  async saveStatistics(data: any) {
      try {
        // Calcul des statistiques
        const newStat = await this.calculateStatistics(data);
  
        // Enregistrement des statistiques
            return this.create(newStat)
      } catch (err) {
        // Gestion des erreurs
        console.error("Error saving statistics:", err);
        throw new Error("Failed to save statistics.");
      }
    }


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
        "userId":data.userId,
        "categoryBreakdown":categoryBreakdown,
        "actionBreakdown":actionBreakdown,
        "totalInteractions":totalInteractions,
        "earliestInteraction":earliestInteraction,
        "latestInteraction":latestInteraction,
        "uniqueActions":uniqueActions,
        "uniqueCategories":uniqueCategories,
        "interactionsPerHour": interactionsPerHour,
       };
       return  stat
       
    }

  private groupBy(data: string[]): Record<string, number> {
      return data.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    }









}
