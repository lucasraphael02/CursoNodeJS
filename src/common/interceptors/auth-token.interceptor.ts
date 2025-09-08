import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization?.split(' ')[1];
    if (!authToken || authToken !== '123456') {
      throw new UnauthorizedException('Token inválido ou ausente.');
    }
    console.log('Token:', authToken);
    return next.handle();
  }
}
