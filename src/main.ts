import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //retira chaves que não estão no DTO
      forbidNonWhitelisted: true, //levantar erro quando a chave não existir
      transform: false, //tenta tranformar os dados de Params e DTOs
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
