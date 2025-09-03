import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      catchError(error => {
        console.log('Deu Erro');
        return throwError(() => error);
      }),
    );
  }
}
