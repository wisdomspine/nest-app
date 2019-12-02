import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import { logger } from './common/middleware/logger.function.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerService } from './common/logger/logger.service';
import { All } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { CatValidatorPipe } from './common/pipes/cat-validator.pipe';
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/static', express.static("static/"))
  await app.listen(3000);
}
bootstrap();
