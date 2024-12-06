import { IsObject, IsNotEmpty, IsNumber, IsString, IsArray, IsDateString, IsOptional } from 'class-validator';

export class CreateStatisticDTO {

  userId : string

  categoryBreakdown: {
    content_interaction: number;
    auth_interaction: number;
};

actionBreakdown: {
    like: number;
    login: number;
};

totalInteractions: number;

earliestInteraction: string; 
latestInteraction: string; 

uniqueActions: number;
uniqueCategories: number;
interactionsPerHour: number;
}
