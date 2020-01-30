import { Injectable } from '@nestjs/common';
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { plainToClass, classToClass } from 'class-transformer';
import { EnvDTO } from './environment.dto';
import { Validate, validate, validateSync, ValidationError } from 'class-validator';

@Injectable()
export class ConfigService {
    private readonly envConfig: Record<string, string>;

    constructor(filepath: string){
        this.envConfig=  dotenv.parse(fs.readFileSync(path.resolve(filepath)));
        const conf = dotenv.parse(fs.readFileSync(path.resolve(filepath)));
        const config: EnvDTO = plainToClass(EnvDTO, conf, {
            excludeExtraneousValues: true
        });

        const validationErrors: ValidationError[] = validateSync(config, {
                forbidUnknownValues : true,
                validationError:{
                    target: false
                }
            }
        );

        if(validationErrors.length <= 0){
            this.envConfig = conf;
        }
        else{
            const errors: {[property:string]:object}[] =[];
            validationErrors.forEach((e:ValidationError) => {
                errors[e.property] = e.constraints; 
            })
            throw errors;
        }
        
    }

    get(key: string): string{
        return this.envConfig[key];
    }
}
