import { Injectable } from '@nestjs/common';
import * as cacheManager from 'cache-manager';  // Correct importation

@Injectable()
export class CacheService {
  private cache;

  constructor() {
    this.cache = cacheManager.caching({
      store: 'memory',  // Utilisation d'un cache en mémoire
      ttl: 60 /* durée de vie par défaut des éléments en cache */,
    });
  }

  // Fonction pour récupérer des données du cache
  async getCache(key: string): Promise<any> {
    return this.cache.get(key);
  }

  // Fonction pour définir des données dans le cache
  async setCache(key: string, value: any, ttl: number = 60): Promise<void> {
    await this.cache.set(key, value, { ttl });
  }

  // Fonction pour supprimer des données du cache
  async delCache(key: string): Promise<void> {
    await this.cache.del(key);
  }
}
