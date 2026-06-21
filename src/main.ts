import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionFilter } from './common/filters/database.exception.filter';
const Port = process.env.PORT ?? 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new DatabaseExceptionFilter());
  await app.listen(Port);
}
bootstrap()
  .then(() => console.info(`app running on http://localhost:${Port}`))
  .catch((error) => console.error(error));
