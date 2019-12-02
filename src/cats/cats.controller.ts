import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpStatus, UseFilters, ForbiddenException, UsePipes, ValidationPipe, BadRequestException, UseGuards, SetMetadata, UseInterceptors } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";
import * as chalk from "chalk";
import { Cat } from "./interfaces/cat.interface";
import { TransformInterceptor } from "../common/interceptors/transform.interceptor";
import { User } from "../common/decorators/user.decorator";

@Controller("cats")
@UseInterceptors(TransformInterceptor)
export class CatsController{

    constructor(private catsService: CatsService){
        console.log(chalk.cyan(catsService));
    }
    
    @Get()
    async findAll(): Promise<Cat[]>{
        //throw new HttpException('', HttpStatus.NOT_FOUND);
        return this.catsService.findAll();
    };

    // @Get(":id")
    // findOne(@Param("id") id: string): string{
    //     return `This return a #${id} cat`;
    // }

    @Post()
    @UsePipes(new ValidationPipe({transform: true, 
        skipMissingProperties: true   
    }))
    async create(@Body() newCat: CreateCatDto){
      return  this.catsService.create(newCat);
    }

    // @Put(":id")
    // update(@Param("id") id: string, @Body() cat: CreateCatDto): any{
    //     return `This update a #${id} cat`;
    // }

    // @Delete(":id")
    // delete(@Param("id") id: string): any{
    //     return `This delete a #${id} cat`;
    // }

    @Get("sd")
    async findFd(@User() id: any){
        return id;
    }
}