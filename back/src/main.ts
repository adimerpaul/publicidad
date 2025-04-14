import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  // cors
  app.enableCors({
    origin: process.env.FRONTEND_URL,
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log('http://localhost:' + process.env.PORT);
}
bootstrap();
