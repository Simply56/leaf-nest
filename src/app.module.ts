import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantsModule } from './plants/plants.module';
import { Plant } from './plants/entities/plant.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'plants.db',
      entities: [Plant],
      synchronize: true, // Be careful with this in production
    }),
    PlantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
