import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LoggerService } from '../logger/logger.service';
import chalk = require('chalk');

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(private loggerService: LoggerService){
    super();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    this.loggerService.logException(exception);
    super.catch(exception, host);
  }
}
