import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('---------------------------Request...');
    console.log('---------------------------url : ', req.originalUrl);
    console.log('---------------------------method : ', req.method);
    console.log('---------------------------body : ', req.body);
    console.log('---------------------------query : ', req.query);
    next();
  }
}
