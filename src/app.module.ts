import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Plant } from "./plants/entities/plant.entity";
import { PlantsModule } from "./plants/plants.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "sqlite",
            database: "plants.db",
            entities: [Plant],
            synchronize: true, //TODO: Be careful with this in production
        }),
        PlantsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
