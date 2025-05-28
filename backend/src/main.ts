import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,POST',
    credentials: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(Number(port));
}
bootstrap();