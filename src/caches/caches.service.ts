import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCacheDto } from '../database/dto/Caches/Cache.dto';
import { Repository } from 'typeorm';
import { CacheEntity } from 'src/database/entities/cache.entity';

@Injectable()
export class CachesService {

  constructor(
    @InjectRepository(CacheEntity)
    private readonly cacheRepository: Repository<CacheEntity>,
  ) {}

  
  create(createCachDto: CreateCacheDto) {
    const newCache = this.cacheRepository.create(createCachDto);
    return this.cacheRepository.save(newCache)
     
  }

  findAll() {
    return this.cacheRepository.find()
  }

  findOne(userId: any) {
    return  this.cacheRepository.findOne({
      where: { userId : userId },
    });
    
  }


}
