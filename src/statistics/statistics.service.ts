import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticsEntity } from '../database/entities/statistics.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

interface InteractionData {
  id: string;
  userId: string;
  value: string;
  createdAt: string;
}

interface Interaction {
  action: string;
  category: string;
  time: string;
}

@Injectable()
export class StatisticsService {
  private readonly logger = new Logger(StatisticsService.name);
  private readonly url = process.env.URL || 'http://localhost:3000/api/v1';

  constructor(
    @InjectRepository(StatisticsEntity)
    private readonly statisticsRepository: Repository<StatisticsEntity>,
    private readonly httpService: HttpService
  ) {}

  // User-specific statistics
  async userStatistics(userId: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.url}/caches/${userId}`)
      );
      return this.calculateStatistics(response.data);
    } catch (error) {
      this.logger.error(`Error fetching user statistics: ${error.message}`, error.stack);
      throw new Error(`Failed to retrieve user statistics: ${error.message}`);
    }
  }

  // Global users statistics
  async usersStatistics(): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.url}/caches`)
      );
      return this.calculateGlobalStatistics(response.data);
    } catch (error) {
      this.logger.error(`Error fetching global statistics: ${error.message}`, error.stack);
      throw new Error(`Failed to retrieve global statistics: ${error.message}`);
    }
  }

  // Calculate global statistics
  async calculateGlobalStatistics(data: any[]): Promise<StatisticsEntity[]> {
    try {
      const statsMap = new Map<string, number>();

      data.forEach((item) => {
        const interactions = JSON.parse(item.value);
        interactions.forEach((interaction) => {
          const parsedInteraction = JSON.parse(interaction);
          const key = parsedInteraction.category;
          statsMap.set(key, (statsMap.get(key) || 0) + 1);
        });
      });

      const statistics: StatisticsEntity[] = [];

      for (const [feature, usageCount] of statsMap) {
        const stat = this.statisticsRepository.create({ 
          feature, 
          usageCount,
          createdAt: new Date() 
        });
        const savedStat = await this.statisticsRepository.save(stat);
        statistics.push(savedStat);
      }

      return statistics;
    } catch (error) {
      this.logger.error(`Error in global statistics calculation: ${error.message}`, error.stack);
      throw new Error(`Failed to calculate global statistics: ${error.message}`);
    }
  }

  // Comprehensive statistics calculation
  calculateStatistics(data: InteractionData[]): any {
    try {
      // Parse the nested JSON strings
      const parsedInteractions = data.map(item => 
        JSON.parse(item.value).map((interaction: string) => 
          JSON.parse(interaction)
        )
      );

      // Flatten the interactions
      const allInteractions = parsedInteractions.flat();

      // Group interactions by category and action
      const categoryBreakdown = this.groupByCategory(allInteractions);
      const actionBreakdown = this.groupByAction(allInteractions);

      // Calculate user-specific metrics
      const userMetrics = this.calculateUserMetrics(data, parsedInteractions);

      return {
        totalInteractions: allInteractions.length,
        uniqueUsers: new Set(data.map(item => item.userId)).size,
        categoryBreakdown,
        actionBreakdown,
        userMetrics,
        timespan: this.calculateTimespan(data),
        interactionsPerHour: this.calculateInteractionsPerHour(data)
      };
    } catch (error) {
      this.logger.error(`Error in statistics calculation: ${error.message}`, error.stack);
      throw new Error(`Failed to calculate statistics: ${error.message}`);
    }
  }

  // Private helper methods remain the same as in the original implementation
  private groupByCategory(interactions: Interaction[]) {
    return interactions.reduce((acc, interaction) => {
      acc[interaction.category] = (acc[interaction.category] || 0) + 1;
      return acc;
    }, {});
  }

  private groupByAction(interactions: Interaction[]) {
    return interactions.reduce((acc, interaction) => {
      acc[interaction.action] = (acc[interaction.action] || 0) + 1;
      return acc;
    }, {});
  }

  private calculateUserMetrics(
    data: InteractionData[], 
    parsedInteractions: Interaction[][]
  ) {
    return data.map((item, index) => ({
      userId: item.userId,
      totalInteractions: parsedInteractions[index].length,
      uniqueActions: new Set(parsedInteractions[index].map(i => i.action)).size,
      uniqueCategories: new Set(parsedInteractions[index].map(i => i.category)).size,
      lastInteractionTime: parsedInteractions[index][parsedInteractions[index].length - 1].time
    }));
  }

  private calculateTimespan(data: InteractionData[]) {
    const timestamps = data.map(item => new Date(item.createdAt).getTime());
    return {
      earliest: new Date(Math.min(...timestamps)),
      latest: new Date(Math.max(...timestamps)),
      durationInMinutes: (Math.max(...timestamps) - Math.min(...timestamps)) / (1000 * 60)
    };
  }

  private calculateInteractionsPerHour(data: InteractionData[]) {
    const timestamps = data.map(item => new Date(item.createdAt).getTime());
    const timespan = this.calculateTimespan(data);
    const hours = timespan.durationInMinutes / 60;
    return {
      total: data.length / hours,
      perHour: data.length / (hours || 1)
    };
  }
}