import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    console.log('SimpleMiddleware executado');

    next();
  }
}
