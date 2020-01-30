import { Module, CacheModule } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/multer-config.service';
import * as fs from "fs";
import * as path from "path";
import multer = require('multer');


@Module({
  providers: [PhotoService],
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: function(req, file, cb){
          
        }
      })
    }),
    TypeOrmModule.forFeature([Photo]),
    CacheModule.register({
      ttl: 100,
    })
  ],
  controllers: [PhotoController],
  exports: [TypeOrmModule]
})
export class PhotoModule {}
//