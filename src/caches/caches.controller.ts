import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CachesService } from './caches.service';
import { CreateCacheDto } from '../database/dto/Caches/Cache.dto';

@Controller('caches')
export class CachesController {
  constructor(private readonly cachesService: CachesService) {}

  @Post()
  create(@Body() createCachDto: CreateCacheDto) {
    return this.cachesService.create(createCachDto);
  }

  @Get()
  findAll() {
    return this.cachesService.findAll();
  }

  @Get('/:userId')
  findOne(@Param('userId') userId: string) {
    return this.cachesService.findOne(userId);
  }

}
