import { IsOptional, IsDateString } from 'class-validator';

export class WaterPlantDto {
  @IsOptional()
  @IsDateString()
  wateredAt?: string;
}
