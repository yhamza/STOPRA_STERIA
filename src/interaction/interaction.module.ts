import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InteractionEntity } from '../database/entities/interactions.entity';
import { UserEntity } from '../database/entities/user.entity';
import { InteractionService } from './interaction.service';
import { InteractionController } from './interaction.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([InteractionEntity, UserEntity]), // Récupération des entités de la base de données
    HttpModule, // Ajout de HttpModule pour effectuer des requêtes HTTP si nécessaire
  ],
  controllers: [InteractionController], // Le contrôleur de votre module
  providers: [InteractionService], // Le service de votre module
  exports: [InteractionService ], // Permet d'exporter le service pour d'autres modules
})
export class InteractionModule {}
