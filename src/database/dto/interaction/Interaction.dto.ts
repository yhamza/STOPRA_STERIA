import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CreateInteractionDto {
  
  @IsNotEmpty()
  @IsString()
  userId: string; // ID de l'utilisateur associé à l'interaction

  @IsNotEmpty()
  @IsString()
  action: string; // Type d'action effectuée

  @IsOptional()
  @IsString()
  category?: string; // Catégorie optionnelle pour classer l'action

  @IsOptional()
  timestamp?: Date; 
}
