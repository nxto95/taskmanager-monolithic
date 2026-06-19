import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const Port = process.env.PORT ?? 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Port);
}
bootstrap()
  .then(() => console.info(`app running on http://localhost:${Port}`))
  .catch((error) => console.error(error));
