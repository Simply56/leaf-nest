import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PlantDto {
  @ApiPropertyOptional({
    description: 'Human-friendly name of the plant',
    example: 'Snake Plant',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Path or URL to the plant image',
    example: '/static/plant_1_1712345678.png',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  imagePath?: string;

  @ApiPropertyOptional({
    description: 'Last watering date in ISO 8601 format',
    example: '2025-09-20T10:30:00.000Z',
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  lastWatered?: string;
}

export class UploadImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file to upload',
  })
  image: any;
}
