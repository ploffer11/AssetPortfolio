import './env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.FRONTEND_URL });
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true, // 검증 프로퍼티가 대상 오브젝트에 존재하지 않을 경우
      forbidUnknownValues: true, // 이상한 object를 검사할 경우
      whitelist: true, // 검증 규칙이 없는 프로퍼티를 모두 제거
      forbidNonWhitelisted: true, // 검증 규칙이 없는 프로퍼티가 있으면 에러
    }),
  );
  await app.listen(3001);
}
bootstrap();
