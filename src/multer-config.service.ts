import { Injectable, BadRequestException } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import * as multer from "multer";

export const  ACCEPTED_FILE_FORMATS= ["image/png", "image/jpeg", "image/jpg"];


export const DISK_STORAGE = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "upload/");
    },
    filename: (req, file, callback) =>{
        callback(null, Date.now()+"."+ file.mimetype.split("/")[1])
    },
})
@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    createMulterOptions(): import("@nestjs/platform-express").MulterModuleOptions | Promise<import("@nestjs/platform-express").MulterModuleOptions> {
        return {
            dest: "/upload",
            fileFilter: (req, file, callback) =>{
                if(!ACCEPTED_FILE_FORMATS.includes(file.mimetype)){
                    callback(new BadRequestException("Invalid file format"), true);
                }

                callback(null, true);
            },
        }
    }
}
