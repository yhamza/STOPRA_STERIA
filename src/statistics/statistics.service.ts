import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { CacheDto } from '../database/dto/Cache/Cache.dto';

@Injectable()
export class StatisticsService {
  constructor(private readonly cacheService: CacheService) {}

  // Exemple d'une méthode pour calculer des statistiques
  async getStatistics(): Promise<any> {
    const cacheData = await this.cacheService.getCache('statisticsData');
    if (cacheData) {
      return cacheData;  // Retourner les données mises en cache si disponibles
    }

    // Logique pour calculer les statistiques (par exemple, nombre d'utilisateurs)
    const statistics = {
      userCount: 100,  // Calcul des statistiques
      activeUsers: 85,
    };

    // Mise en cache des statistiques pour des accès rapides
    await this.cacheService.setCache('statisticsData', statistics, 3600);  // Expiration de 1 heure
    return statistics;
  }
}
