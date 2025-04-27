import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstra() {
  const port = 8000;
  const app = await NestFactory.create(AppModule)
  app.listen(8000);

 }
bootstra();
