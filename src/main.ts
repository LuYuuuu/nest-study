import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// 引入cookie-parser
import * as cookieParser from 'cookie-parser'
// 引入express-session
import * as session from 'express-session'

async function bootstrap() {
  // 引入Express
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 配置静态资源路径(官网案例 https://nest.nodejs.cn/techniques/mvc)
  // app.useStaticAssets(join(__dirname,'..','public'))  // 通过 http://localhost:3000/1.jpg 访问
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/'   // 配置虚拟目录static,此时public目录无法访问  
  })

  // 配置模板引擎文件目录
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  // 需要先安装模板引擎npm i hbs
  // 再选择模板引擎(官方使用hbs，教程使用ejs)
  app.setViewEngine('hbs')
  app.setViewEngine('ejs')
  // 再去app.controller.ts中配置模板引擎

  // 配置cookie中间件
    // app.use(cookieParser(加密秘钥))
  app.use(cookieParser('987292513'))

  // 配置session中间件
  app.use(session({
    secret: '987292513',  // 秘钥
    name: 'sessionId',  //返回客户端的key 的名称，默认为sonnect.sid
    resave: false,  // 是否每次请求都重新保存session
    saveUninitialized: false,  // 是否每次请求都重新生成session
    rolling: true,  // 是否每次响应都重新设置session的过期时间(重新刷新cookie)
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7  // 设置session过期时间
    }
  }))

  await app.listen(3000);
}
bootstrap();
