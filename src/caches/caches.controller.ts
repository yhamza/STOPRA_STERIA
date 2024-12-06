import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CachesService } from './caches.service';
import { CreateCacheDTO } from '../database/dto/Caches/Cache.dto';

@Controller('caches')
export class CachesController {
  constructor(private readonly cachesService: CachesService) {}


  // save cach in database
  @Post()
  create(@Body() createCachDto: CreateCacheDTO) {
    return this.cachesService.create(createCachDto);
  }


  //get users cahces
  @Get()
  findAll() {
    return this.cachesService.findAll();
  }


  //get user cache
  @Get('/:userId')
  findOne(@Param('userId') userId: string) {
    return this.cachesService.findOne(userId);
  }


}
