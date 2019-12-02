import { Module, MiddlewareConsumer, RequestMethod, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { LoggerService } from './common/logger/logger.service';
import { APP_FILTER, APP_PIPE, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { CatValidatorPipe } from './common/pipes/cat-validator.pipe';
import { RolesGuard } from './common/guards/roles.guard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Global()
@Module({
  imports: [CatsModule, DatabaseModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, LoggerService,
    {provide: APP_FILTER, useClass:AllExceptionsFilter}
  ],
  exports: [LoggerService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware)
    .exclude(
      {path:'cats', method:RequestMethod.GET},
      {path: 'cats', method: RequestMethod.POST}
    )
    .forRoutes(CatsController);
  }
}
