import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class Study8Guard implements CanActivate {
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    console.log('守卫执行了');
    // 可以通过 context.switchToHttp().getRequest() 获取请求对象（包括cookie和session，以此可以进行访问权限的判断）
    const request = context.switchToHttp().getRequest();
    console.log('request.cookies :>> ', request.cookies);
    console.log('request.session :>> ', request.session);

    // 同意访问返回 true，拒绝访问返回 false
    return true;
  }
}
