import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  providers: [CacheService],
  exports: [CacheService],  // Exporte le service pour l'utiliser dans d'autres modules
})
export class CacheModule {}
