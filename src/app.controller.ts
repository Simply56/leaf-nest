import { Controller, Get, UseGuards } from "@nestjs/common";
import type { AppService } from "./app.service";
import { ApiKeyGuard } from "./auth/api-key.guard";

@Controller()
@UseGuards(ApiKeyGuard)
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
