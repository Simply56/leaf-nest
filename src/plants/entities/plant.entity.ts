import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('plants')
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 500, default: '/static/defaultPlant.png' })
  imagePath: string;

  @Column({ type: 'datetime', nullable: true })
  lastWatered: Date;
}
