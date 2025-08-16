import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Serve static files from the 'static' directory
  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: '/static/',
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap().catch((reason) => {
  console.log(reason);
});
