import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { MulterModule } from '@nestjs/platform-express';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { PhotoModifyService } from './photo-modify.service';
import { AuthorModule } from "../author/author.module";

@Module({
  providers: [PhotoService, PhotoModifyService],
  imports: [
    MulterModule.register({
      dest: "./upload"
    }),
    TypeOrmModule.forFeature([Photo]),
    AuthorModule
  ],
  controllers: [PhotoController],
  exports: [TypeOrmModule]
})
export class PhotoModule {}
