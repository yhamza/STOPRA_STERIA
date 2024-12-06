import { IsObject, IsNotEmpty, IsNumber, IsString, IsArray, IsDateString, IsOptional } from 'class-validator';

export class CreateStatisticDTO {
  categoryBreakdown: {
    content_interaction: number;
    auth_interaction: number;
};

actionBreakdown: {
    like: number;
    login: number;
};

totalInteractions: number;

earliestInteraction: string; // ISO 8601 timestamp
latestInteraction: string; // ISO 8601 timestamp

uniqueActions: number;
uniqueCategories: number;
interactionsPerHour: number;
}
