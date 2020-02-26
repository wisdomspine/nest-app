import { Controller, Post, Body, UsePipes, ValidationPipe, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Author } from './author.entity';
import { AuthorService } from './author.service';
import { AuthorDto } from './author.dto';

@Crud({
    model: {
        type: Author
    },
    routes: {
        createOneBase: {
            decorators: [
                UsePipes(new ValidationPipe({whitelist: true, groups: ["create"]}))
            ]
        }
    },
    dto:{
        create: AuthorDto
    }
})
@Controller('authors')
export class AuthorController implements CrudController<Author>{
    constructor(public service: AuthorService){
        
    }

    @Get("nigga")
    async () {
        return new HttpException("not found", HttpStatus.NOT_FOUND);
    }
}
