import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Author } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorService extends TypeOrmCrudService<Author>{
    constructor(@InjectRepository(Author) repo){
        super(repo);
    }
}
