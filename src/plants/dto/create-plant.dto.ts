import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreatePlantDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  imagePath?: string;

  @IsOptional()
  @IsDateString()
  lastWatered?: string;
}
