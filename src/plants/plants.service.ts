import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DEFAULT_PLANT_IMAGE_PATH, Plant } from './entities/plant.entity';
import { PlantDto } from './dto/create-plant.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
  ) {}

  async create(createPlantDto: PlantDto): Promise<Plant> {
    const plant = this.plantRepository.create(createPlantDto);
    return await this.plantRepository.save(plant);
  }

  async findAll(): Promise<Plant[]> {
    return await this.plantRepository.find();
  }

  async findOne(id: number): Promise<Plant> {
    const plant = await this.plantRepository.findOne({ where: { id } });
    if (plant == null) {
      throw new NotFoundException(`Plant with ID ${id} not found`);
    }
    return plant;
  }

  async update(id: number, updatePlantDto: PlantDto): Promise<Plant> {
    const plant = await this.findOne(id);
    Object.assign(plant, updatePlantDto);
    return await this.plantRepository.save(plant);
  }

  async remove(id: number): Promise<void> {
    const plant = await this.findOne(id);
    this.removeImage(plant);
    await this.plantRepository.remove(plant);
  }

  async uploadImage(id: number, file: Express.Multer.File): Promise<Plant> {
    const plant = await this.findOne(id);

    this.removeImage(plant);

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const filename = `plant_${id}_${timestamp}${extension}`;

    // Save file to static folder
    const filePath = path.join(__dirname, 'static', filename);
    fs.writeFileSync(filePath, file.buffer);

    // Update plant's imagePath
    plant.imagePath = `/static/${filename}`;
    return await this.plantRepository.save(plant);
  }

  private removeImage(plant: Plant) {
    if (plant.imagePath === DEFAULT_PLANT_IMAGE_PATH) {
      return;
    }
    fs.unlinkSync(path.join(process.cwd(), plant.imagePath));
    plant.imagePath = DEFAULT_PLANT_IMAGE_PATH;
  }
}
