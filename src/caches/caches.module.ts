import { Module } from '@nestjs/common';
import { CachesService } from './caches.service';
import { CachesController } from './caches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheEntity } from 'src/database/entities/cache.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CacheEntity])],
  controllers: [CachesController],
  providers: [CachesService],
})
export class CachesModule {}
