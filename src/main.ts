import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = 3000 || process.env.PORT;
  await app.listen(port);
  Logger.log(`API is running on port: ${port} 🔥 !`);
}
bootstrap();
