import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { InteractionEntity } from '../database/entities/interactions.entity';
import { CreateInteractionDto } from 'src/database/dto/interaction/Interaction.dto';
import { RolesGuard } from 'src/guards/Roles.Guard';
import { JwtAuthGuard } from 'src/guards/JwtAuth.Guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
@Controller('interactions')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  // Créer une nouvelle interaction

  @Post()
  async createInteraction(@Body() createInteractionDto: CreateInteractionDto): Promise<InteractionEntity> {
    return this.interactionService.create(createInteractionDto);
  }


  // Récupérer les interactions d'un utilisateur
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN||Role.MODERATOR) 
   @Get('/:userId')
   async getInteractionsByUser(@Param('userId') userId: string): Promise<InteractionEntity[]> {
     return this.interactionService.findByUserId(userId);

   }


  // delete interaction par userid
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN) 
  @Delete('/:userId')
  deleteInteractionByUser(@Param('userId') userId: string): Promise<any> {
    return this.interactionService.deleteByUserId(userId);
  }


  


  @Get('/setCaches/:userId')
  async setCaches(@Param('userId') userId: string): Promise<any> {
    return this.interactionService.setCache(userId);
    }





}
