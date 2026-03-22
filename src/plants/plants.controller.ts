import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlantsService } from './plants.service';
import { PlantDto, UploadImageDto } from './dto/plant.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Plant } from './entities/plant.entity';
import { ApiKeyGuard } from '../auth/api-key.guard';

@ApiTags('plants')
@Controller('plants')
@UseGuards(ApiKeyGuard)
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Post()
  create(@Body() createPlantDto: PlantDto): Promise<Plant> {
    return this.plantsService.create(createPlantDto);
  }

  @Get()
  findAll(): Promise<Plant[]> {
    return this.plantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Plant> {
    return this.plantsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlantDto: PlantDto,
  ): Promise<Plant> {
    return this.plantsService.update(id, updatePlantDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.plantsService.remove(id);
  }

  @Post(':id/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Image upload payload', type: UploadImageDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: undefined, // Use memory storage
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(
            new BadRequestException(
              'Only image files (jpg, jpeg, png, gif) are allowed!',
            ),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    }),
  )
  async uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Plant> {
    if (!file) {
      throw new BadRequestException(
        'No image file uploaded. Please provide an image file.',
      );
    }

    return await this.plantsService.uploadImage(id, file);
  }
}
