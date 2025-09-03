import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { of, tap } from 'rxjs';

@Injectable()
export class SimpleCacheinterceptor implements NestInterceptor {
  private readonly cache = new Map();

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    if (this.cache.has(url)) {
      console.log('Cache hit for URL:', url);
      return of(this.cache.get(url));
    }
    return next.handle().pipe(
      tap(data => {
        this.cache.set(url, data);
        console.log('Armazenado em cache:', url);
      }),
    );
  }
}
