import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Photo } from './photo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoService extends TypeOrmCrudService<Photo>{
    constructor(@InjectRepository(Photo) repo){
        super(repo);
    }
}
