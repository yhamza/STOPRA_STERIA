// import { Controller, Get, Param, HttpException, HttpStatus, Body, Post, UseGuards } from '@nestjs/common';
// import { StatisticsService } from './statistics.service';
import { StatisticsEntity } from '../database/entities/statistics.entity';
import { RolesGuard } from 'src/guards/Roles.Guard';
import { JwtAuthGuard } from 'src/guards/JwtAuth.Guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  //save user statistics
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN||Role.MODERATOR) 
  @Post()
  async saveStatistics(@Body() statistics: StatisticsEntity): Promise<any> {
    try {
      return await this.statisticsService.saveStatistics(statistics);
      } catch (error) {
        throw new HttpException(
          error.message || "Erreur lors de la sauvegarde des statistiques.",
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
  }

  //get  user statistics
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN||Role.MODERATOR) 
  @Get('/:userId')
  async saveStat(@Param('userId') userId: string){
    try {
      return await this.statisticsService.getUserStat(userId);
      } catch (error) {
        throw new HttpException(
          error.message || "Erreur lors de la sauvegarde des statistiques de l'utilisateur.",
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
  }

  //get users statistics
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN||Role.MODERATOR) 
  @Get()
  getAllUsersStatistics(){
    return this.statisticsService.getstats();
  }

  

  

}
