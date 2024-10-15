import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { handleDatabase } from './common/database/handler.database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  handleDatabase()
  await app.listen(3000);
}
bootstrap();
