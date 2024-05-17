import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './config/cors.config';
import { AllExceptionsFilter } from './catchAllExeption';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const log = new LoggerService(AppModule.name);
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  app.enableCors(corsOptions);

  const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const PORT = process.env.PORT || 8000;
  await app.listen(PORT, () => {
    log.verbose(`app is running on http://localhost:${PORT}/api`);
  });
}
bootstrap();
