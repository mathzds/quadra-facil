import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { handleDatabase } from './common/database/handler.database';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  handleDatabase()
  app.use(cookieParser());

  app.enableCors({
    origin: "*",
    credentials: true
  })
  await app.listen(3000);
}
bootstrap();
