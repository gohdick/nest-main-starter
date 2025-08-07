import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { QueryFailedExceptionFilter } from '../filters/query-failed-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    
const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept,Authorization,headers',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new QueryFailedExceptionFilter(),
  );
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
