import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import chalk = require('chalk');
import { plainToClass } from "class-transformer";
import { validate } from 'class-validator';

@Injectable()
export class CatValidatorPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
    const {metatype} = metadata;
    console.log(chalk.yellow(JSON.stringify(metatype)));
    if(!metatype || !this.toValidate(metatype)){
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if(errors.length > 0){
      console.log(chalk.magenta(JSON.stringify(errors)));
      throw new BadRequestException('validation failed');
    }
    return value;

  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
