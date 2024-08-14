import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Study1Controller } from './study1/study1.controller';
import { Study2Controller } from './study2/study2.controller';
import { Study2Service } from './study2/study2.service';
import { Study3Service } from './study3/study3.service';
import { Study3Controller } from './study3/study3.controller';
import { Study4Service } from './study4/study4.service';
import { Study4Controller } from './study4/study4.controller';
import { Study5Controller } from './study5/study5.controller';
import { Study5Middleware } from './study5/study5.middleware';
import { Study55Middleware } from './study5/study55/study55.middleware';
import { Study6Controller } from './study6/study6.controller';
import { Study7Module } from './study7/study7.module';
import { Study8Controller } from './study8/study8.controller';
import { Study9Module } from './study9/study9.module';
// 引入mongoose
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // 与数据库建立连接 MongooseModule.forRoot('数据库地址') 
  imports: [Study7Module, Study9Module, MongooseModule.forRoot('mongodb://localhost:27017/chat')],
  controllers: [AppController, Study1Controller, Study2Controller, Study3Controller, Study4Controller, Study5Controller, Study6Controller, Study8Controller],
  providers: [AppService, Study2Service, Study3Service, Study4Service],
})
export class AppModule implements NestModule {
  // 配置中间件
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Study5Middleware)
      // .forRoutes('study5'); // 匹配指定路由
      // .forRoutes('*');  // 匹配所有路由
      .forRoutes({ 
        path: 'study5', 
        method: RequestMethod.GET  // 只有GET请求才会匹配
      },{
        path: 'study4', 
        method: RequestMethod.POST  // 只有POST请求才会匹配
      })
      .apply(Study5Middleware,Study55Middleware)
      .forRoutes('study5/study55');
  }
}
