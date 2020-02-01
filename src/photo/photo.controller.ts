import { Controller, Get, UseInterceptors, Req, Post, UploadedFile, UploadedFiles } from '@nestjs/common';
import { PhotoService } from './photo.service';
import chalk = require('chalk');
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";

@Controller('photos')
export class PhotoController {
    constructor(private readonly photoService: PhotoService){

    }
    @Get()
    findAll(){
        return this.photoService.findAll();
    }

    @Get("trust")
    getIt(@Req() req){
        console.log(chalk.dim(req));
        return 1;
    }

    @Post("upload")
    @UseInterceptors(FilesInterceptor("files", 100, {
        storage: diskStorage({
            destination: (req, file, callback) => {
                console.log(file);
                callback(null, "./upload");
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() +"."+ file.mimetype.split("/")[1]);
            }
        })
    }))
    uploadFile(@UploadedFiles() files){
        console.log(files);
    }
}
//