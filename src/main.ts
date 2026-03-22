import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors({
        origin: "*",
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    // Serve static files from the 'static' directory
    app.useStaticAssets(join(__dirname, "..", "static"), {
        prefix: "/static/",
    });

    const config = new DocumentBuilder()
        .setTitle("LEAF")
        .setDescription("API for watering plants")
        .build();

    const document = SwaggerModule.createDocument(app, config, {
        deepScanRoutes: true,
    });

    // Serve Swagger UI
    SwaggerModule.setup("api", app, document);

    await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
}
bootstrap().catch((reason) => {
    console.log(reason);
});
