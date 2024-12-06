import { IsArray, IsString, IsNotEmpty, IsDateString, ArrayMinSize, IsObject } from 'class-validator';

class ValueDTO {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsDateString()
  @IsNotEmpty()
  time: string;
}

export class CreateCacheDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsObject({ each: true })
  value: ValueDTO[];
}
