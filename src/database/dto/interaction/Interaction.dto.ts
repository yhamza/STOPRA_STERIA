import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CreateInteractionDto {
  
  @IsNotEmpty()
  @IsString()
  userId: string; 

  @IsNotEmpty()
  @IsString()
  action: string; 

  @IsOptional()
  @IsString()
  category?: string; 

  @IsOptional()
  timestamp?: Date; 
}
