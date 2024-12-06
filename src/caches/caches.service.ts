import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCacheDTO } from '../database/dto/Caches/Cache.dto';
import { Repository } from 'typeorm';
import { CacheEntity } from 'src/database/entities/cache.entity';

@Injectable()
export class CachesService {

  constructor(
    @InjectRepository(CacheEntity)
    private readonly cacheRepository: Repository<CacheEntity>,
  ) {}

  
  create(createCachDto: CreateCacheDTO) {
    const newCache = this.cacheRepository.create(createCachDto);
    console.log("cccca",createCachDto);
    
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
