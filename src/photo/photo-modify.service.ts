import { Injectable, Post, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Repository } from 'typeorm';
import { AuthorService } from 'src/author/author.service';
import { Author } from 'src/author/author.entity';

@Injectable()
export class PhotoModifyService {

    constructor(@InjectRepository(Photo) public readonly photoRepository: Repository<Photo>, public authorService: AuthorService){
    }

    create(photo: Photo): Promise<Photo>{
        return this.photoRepository.save(photo);
    }

    async update(params:{id: number, photo: Photo}): Promise<any>{
        await this.photoRepository.createQueryBuilder()
        .update(Photo)
        .set(params.photo)
        .where("id= :id", {id: params.id})
        .execute();

        return this.photoRepository.findOne(params.id);
    }

    async updateViews(id): Promise<any>{
        return this.photoRepository.createQueryBuilder()
        .update(Photo)
        .set({views: () => "views + 1"})
        .where("id= :id", {id})
        .execute();
    }

    async deleteAuthor(params: {id: number, authorsIds: number[]}): Promise<any> {
        const photo: Photo = await this.photoRepository.findOne(params.id, {relations: ["authors"]});
        if(photo != null){
            let isSpliced: Boolean|any = false;
            for(let id of params.authorsIds){
                const index = photo.authors.findIndex(a => a.id == id);
                isSpliced = index != -1 && photo.authors.splice(index, 1);
            }
            return isSpliced ? this.photoRepository.save(photo) : photo;
        }

        return new HttpException("photo not found", HttpStatus.NOT_FOUND);
    }

    async addAuthor(params: {id: number, authorsIds: number[]}): Promise<any> {
        const photo: Photo = await this.photoRepository.findOne(params.id, {relations: ["authors"]});
        if(photo != null){
                const addedIds: number[] = params.authorsIds.filter(e => !photo.authorsIds.includes(e));
                for(let id of addedIds){
                    photo.authors.push(await this.authorService.findOne(id));

                }

                return this.photoRepository.save(photo);
        }

        return new HttpException("photo not found", HttpStatus.NOT_FOUND);
    }   
    
}
