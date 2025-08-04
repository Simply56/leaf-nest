import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export const DEFAULT_PLANT_IMAGE_PATH = '/static/defaultPlant.png';

@Entity('plants')
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 500, default: DEFAULT_PLANT_IMAGE_PATH })
  imagePath: string;

  @Column({ type: 'datetime', nullable: true })
  lastWatered: Date;
}
