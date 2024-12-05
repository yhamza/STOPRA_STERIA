import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { CacheModule } from '../cache/cache.module';  // Importer CacheModule pour la mise en cache

@Module({
  imports: [CacheModule],  // Le module de cache peut être utilisé pour améliorer les performances
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
