import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  providers: [PhotoService],
  imports: [
    MulterModule.register({
      dest: "./upload"
    }),
    TypeOrmModule.forFeature([Photo]),
  ],
  controllers: [PhotoController],
  exports: [TypeOrmModule]
})
export class PhotoModule {}
//