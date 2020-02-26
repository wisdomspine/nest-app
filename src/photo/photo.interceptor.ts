import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { deleteFile } from 'src/common/functions';
import { map } from 'rxjs/operators';
import { deletePhoto } from './photo.functions';

@Injectable()
export class PhotoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(e => {
      deletePhoto(e.filename, (e, g) => {
        console.log(e, g);
      });
    }));
  }
}


//"93a3ad1061ddd0a01afaec9cb974dad4"