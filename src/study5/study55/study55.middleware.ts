import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class Study55Middleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}
