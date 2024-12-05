import { IsString, IsOptional, IsNumber, IsJSON, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class StatisticsDto {
  @IsString()
  userId: string;

  @IsJSON()
  @IsOptional()
  categoryBreakdown?: Record<string, number>;

  @IsJSON()
  @IsOptional()
  actionBreakdown?: Record<string, number>;

  @IsNumber()
  totalInteractions: number;

  @IsNumber()
  uniqueActions: number;

  @IsNumber()
  uniqueCategories: number;

  @IsDate()
  @Type(() => Date)
  earliestInteraction: Date;

  @IsDate()
  @Type(() => Date)
  latestInteraction: Date;

  @IsNumber()
  interactionsPerHour: number;

  @IsJSON()
  @IsOptional()
  additionalMetadata?: Record<string, any>;

  // Nested class for timespan
  @ValidateNested()
  @Type(() => TimespanDto)
  @IsOptional()
  timespan?: TimespanDto;
}

// Nested DTO for timespan
export class TimespanDto {
  @IsDate()
  @Type(() => Date)
  earliest: Date;

  @IsDate()
  @Type(() => Date)
  latest: Date;

  @IsNumber()
  @IsOptional()
  durationInMinutes?: number;
}


