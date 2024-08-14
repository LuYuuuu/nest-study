import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class Study5Middleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('中间件输出日期 :>> ', Date());
    next();
  }
}
