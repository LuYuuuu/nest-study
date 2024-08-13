import { Controller, Get, Render, } from '@nestjs/common';
import { AppService } from './app.service';

// 控制器作用，负责处理传入的请求，并返回对客户端的响应
// 创建控制器： nest g controller 控制器名
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  // 使用Render装饰器，渲染index.hbs模板
  @Render('index')
  getHello(): object {
    return { message: 'Hello World!' }
  }
}
