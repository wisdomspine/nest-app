declare const module: any;

import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.function.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerService } from './common/logger/logger.service';
import { All, HttpStatus } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { CatValidatorPipe } from './common/pipes/cat-validator.pipe';
import * as express from "express";
import * as helmet from "helmet";
import * as cookieParser from "cookie-parser";
import * as csurf from "csurf";
import * as rateLimit from "express-rate-limit";
import * as compression from "compression";
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  });
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine('ejs');

  app.use(rateLimit({
    message:{
      status: HttpStatus.TOO_MANY_REQUESTS,
      message: "To many requests"
    },
    windowMs: 1 * 60 * 1000,
    max: 3
  }))
  app.use(compression({
    level: 5
  }))
  app.use('/static', express.static("static/"))
  app.enableCors({
    origin: ["http://localhost:3000"],
    methods:"GET"
  })
  app.use(helmet({
    noCache: false
    }));
    
  await app.listen(3000);

  if(module.hot){
    module.hot.accept();
    module.hot.dispose(() => app.close())
  }
}
bootstrap();
