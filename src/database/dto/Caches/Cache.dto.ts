import { IsString, IsNotEmpty, IsArray, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CacheValueDto {
  @IsString()
  @IsNotEmpty()
  actions: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsDate()
  @Type(() => Date)
  time: Date;
}

export class CreateCacheDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CacheValueDto)
  value: CacheValueDto[];

  @IsDate()
  @Type(() => Date)
  createdAt: Date;


}
