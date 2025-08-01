import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plant } from './entities/plant.entity';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { WaterPlantDto } from './dto/water-plant.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
  ) {}

  async create(createPlantDto: CreatePlantDto): Promise<Plant> {
    const plant = this.plantRepository.create(createPlantDto);
    return await this.plantRepository.save(plant);
  }

  async findAll(): Promise<Plant[]> {
    return await this.plantRepository.find();
  }

  async findOne(id: number): Promise<Plant> {
    const plant = await this.plantRepository.findOne({ where: { id } });
    if (!plant) {
      throw new NotFoundException(`Plant with ID ${id} not found`);
    }
    return plant;
  }

  async update(id: number, updatePlantDto: UpdatePlantDto): Promise<Plant> {
    const plant = await this.findOne(id);
    Object.assign(plant, updatePlantDto);
    return await this.plantRepository.save(plant);
  }

  async remove(id: number): Promise<void> {
    const plant = await this.findOne(id);
    await this.plantRepository.remove(plant);
  }

  async waterPlant(id: number, waterPlantDto: WaterPlantDto): Promise<Plant> {
    const plant = await this.findOne(id);
    plant.lastWatered = waterPlantDto.wateredAt
      ? new Date(waterPlantDto.wateredAt)
      : new Date();
    return await this.plantRepository.save(plant);
  }

  async uploadImage(id: number, file: Express.Multer.File): Promise<Plant> {
    const plant = await this.findOne(id);

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const filename = `plant_${id}_${timestamp}${extension}`;

    // Save file to static folder
    const filePath = path.join(process.cwd(), 'static', filename);
    fs.writeFileSync(filePath, file.buffer);

    // Update plant's imagePath
    plant.imagePath = `/static/${filename}`;
    return await this.plantRepository.save(plant);
  }
}
