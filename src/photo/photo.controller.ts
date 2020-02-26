import { Controller, UseInterceptors, UploadedFile, Post, UsePipes, ValidationPipe, Body, Put, Param, Delete, Get } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest, CrudRequestInterceptor, ParsedBody, CrudValidationGroups } from "@nestjsx/crud";
import { Photo } from './photo.entity';
import { PhotoDto } from './photo.dto';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConnectionManager, Connection, getConnectionManager, getConnection, getRepository } from 'typeorm';
import { PhotoModifyService } from './photo-modify.service';
import { promises } from 'dns';
import { PhotoInterceptor } from './photo.interceptor';
import { TestDto } from "./test.dto";
import { AuthorService } from 'src/author/author.service';
import { Author } from 'src/author/author.entity';

@Crud({
    model: {
        type: Photo
    },
    query: {
        join: {
            authors: {
                eager: true
            }
        }
    },
    routes: {

    }
})
@Controller('photos')
export class PhotoController implements CrudController<Photo>{
    constructor(
        public service: PhotoService, 
        private photoService: PhotoModifyService, 
        private connection: Connection,
        private authorService: AuthorService
    ){
    }

    // get base(): CrudController<Photo>{
    //     return this;
    // }
    
    // @Put("nick")
    // @UsePipes(new ValidationPipe({whitelist: true}))
    // async cr(@Body() body: TestDto){
    //     return body;
    // }
        
    // @Post()
    // @UseInterceptors(FileInterceptor("file"))
    // @UsePipes(new ValidationPipe({whitelist: true, groups: ["create"]}))
    // async createOne(@UploadedFile() file, @Body() body: PhotoDto){
    //     body.filename = file.filename;
 
    //     const photo: Photo = new Photo();
    //     Object.assign(photo, body);
        
    //     return this.photoService.create(photo);
    // }

    // @Put(":id")
    // @UsePipes(new ValidationPipe({whitelist: true, groups: ["update"], transform: true}))
    // async update(@Body() body: PhotoDto, @Param("id") id: number){
    //     const photo: Photo =new Photo();
    //     console.log(body.count)
    //     delete body.count;
    //     Object.assign(photo, body);
    //     return this.photoService.update({id, photo});
    // }

    // @Put(":id/views")
    // async updateViews(@Param("id") id: number): Promise<any>{
    //     const updated = await this.photoService.updateViews(id);
    //     return updated.raw.affectedRows;
    // }

    // @Put(":id/authors")
    // @UsePipes(new ValidationPipe({whitelist: true, groups: ["add_entity"]}))
    // async addAuthor(@Body() body: PhotoDto, @Param("id") id: number){
    //     if(!Array.isArray(body.authoraIds)) body.authoraIds = [body.authoraIds];
    //     console.log(body.authoraIds);
    //     return this.photoService.addAuthor({id, authorsIds: body.authoraIds.map(e => Number(e))});
    // }

    // @Delete(":id/authors")
    // @UsePipes(new ValidationPipe({whitelist: true, groups: ["delete_entity"]}))
    // async deleteAuthor(@Body() body: PhotoDto, @Param("id") id: number){
    //     if(!Array.isArray(body.authoraIds)) body.authoraIds = [body.authoraIds];
    //     return this.photoService.deleteAuthor({id, authorsIds: body.authoraIds.map(e => Number(e))});        
    // }

    @UseInterceptors(CrudRequestInterceptor)
    @Get("pip/pip")
    async getPip(@ParsedRequest() req: CrudRequest): Promise<any>{
        console.log(req.options.query);
        return this.service.getMany(req);
    }

    @Override("updateOneBase")
    @UsePipes(new ValidationPipe({groups: ["update"], whitelist: true}))
    async update(@ParsedRequest() req: CrudRequest, @ParsedBody() body: PhotoDto){
        return this._update(req, body);
    }

    private async _update(req: CrudRequest, body: PhotoDto): Promise<Photo>{
        console.log(body)
        if(!Array.isArray(body.authorsIds)) body.authorsIds = [body.authorsIds];
        body.authorsIds = body.authorsIds.map(i => Number(i));
        body.authors = [];
        console.log(body);
        let authors: Author[] = [];
        if(body.authorsIds.length > 0){
            authors = await this.authorService.find({
                where: body.authorsIds.map(id => ({id}))
            });
        }
        body.authors.push(...authors);
        const photo: Photo = new Photo();
        Object.assign(photo, body);
        return this.service.updateOne(req, photo);
    }

    
}