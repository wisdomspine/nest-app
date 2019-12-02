import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    console.log("Starting ... ")
    return next.handle().pipe(tap({
      next: e => {
        console.log(e)
      },
      complete: () =>{
        console.log(`completed in ${Date.now() -now} ms ...`);
      }
    }));
  }
}
