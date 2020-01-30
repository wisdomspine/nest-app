import { Controller, Get, UseInterceptors, CacheInterceptor, CacheTTL, Req, UploadedFiles, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';
import chalk = require('chalk');
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('photos')
export class PhotoController {
    constructor(private readonly photoService: PhotoService){

    }
    @Get()
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(20)
    findAll(){
        return this.photoService.findAll();
    }

    @Get("trust")
    getIt(@Req() req){
        console.log(chalk.dim(req));
        return 1;
    }

    @Post("upload")
    @UseInterceptors(FilesInterceptor("files"))
    uploadFile(@UploadedFiles() files){
        console.log(files)
    }
}
