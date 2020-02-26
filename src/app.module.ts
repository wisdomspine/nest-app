import { Module, MiddlewareConsumer, RequestMethod, Global, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { LoggerService } from './common/logger/logger.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhotoModule } from './photo/photo.module';
import { ConfigModule } from './config/config.module';
import { AuthorModule } from './author/author.module';

@Global()
@Module({
  imports: [
    CatsModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(),
    PhotoModule,
    ConfigModule,
    AuthorModule
  ],
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
