# Nest.js 学习笔记（包含使用mongoose对MongoDB数据库进行操作）

## 一、创建并运行项目

```typescript
// 创建项目
npm i @nestjs/cli
nest new project-name
// 运行项目
npm run start
// 热编译项目
npm run start:dev
```

## 二、控制器 controller
>
> 作用：负责处理传入的请求，并返回对客户端的响应
>
### 命令行创建控制器

```typescript
nest g controller 控制器名
// 会自动添加引入并创建文件
```

### 控制器名.controller.ts

```typescript
import { Controller, Get, Query, Request, Post, Body, Param, } from '@nestjs/common';

// 通过 nest g controller study1 创建控制器
@Controller('study1')
export class Study1Controller {
    // @Get() 为get装饰器，用来匹配路由
    @Get('login')
    login() {
        return '登录';
    }

    // 路由传参
    // 通过@Query()获取路由参数 http://localhost:3000/user/register?name=zhangsan&age=18
    @Get('register')
    register(@Query() query:object) {
        console.log('query :>> ', query);
        return query;
    }
    // 通过@Request()获取路由参数 http://localhost:3000/user/register?name=zhangsan&age=18
    @Get('register2')
    register2(@Request() req){
        console.log('req :>> ', req.query);
        return req.query;
    }
    // 获取单独的参数
    @Get('register3')
    register3(@Query('name') name){
        // 此时的name相当于 query.name
        console.log('name :>> ', name);
        return name;
    }

    // @Post() 为post装饰器，用来匹配路由
        // 通过@Body()获取post传值
    @Post('create')
    create(@Body() body) {
        console.log('body :>> ', body);
        return body;
    }

    // 获取动态路由,通过@Param()获取
    // 一般放到最下面，否则会覆盖上面写的接口
    @Get(':id')
    getUser(@Param() params) {
        console.log('params :>> ', params);
        return params;
    }
}
```

## 三、静态资源引入 与 模板引擎渲染

### 配置文件

```typescript
// 在main.ts中配置
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

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
  // 再去控制器中配置模板引擎

  await app.listen(3000);
}
bootstrap();
```

### 使用

```typescript
// 在app.controller.ts中
import { Controller, Get, Render, } from '@nestjs/common';

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
```

## 四、提供器（服务）service
>
> 服务中一般封装 一些公共的功能 和 数据库操作
>
### 命令行创建提供器

```typescript
nest g service 服务名称
```

### 服务名.service.ts

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class Study2Service {
    findAll(){
        return [{title:'abc'},{title:'abc'},{title:'abc'}]
    }
}
```

### 控制器中使用服务

```typescript
import { Controller, Get } from '@nestjs/common';
// 引入服务
import { Study2Service } from './study2.service';

@Controller('study2')
export class Study2Controller {
    // constructor 依赖注入
    constructor(private study2Service: Study2Service) { }
    @Get('findAll')
    findAll(): object {
        // return this.study2Service.findAll();
        return {
            info: this.study2Service.findAll()
        }
    }
}
```

## 五、cookie（保存在浏览器中）

### 安装cookie-parser

```typescript
npm i cookie-parser
```

### 在main.ts引入

```typescript
// 引入cookie-parser
import * as cookieParser from 'cookie-parser'


// 配置cookie中间件
    // app.use(cookieParser(加密秘钥))
  app.use(cookieParser('987292513'))
```

### 使用cookie

```typescript
import { Controller, Get, Req, Response, } from '@nestjs/common';

@Controller('study3')
export class Study3Controller {
    @Get()
    index(@Response() res) {
        // 设置cookie
            // 存活时间 maxAge
            // 是否只允许后端访问 httpOnly (默认false)
            res.cookie('name', 'zhangsan', { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true })
            // signed : 是否对cookie进行加密
            res.cookie('age', 18, { maxAge: 1000 * 60 * 60 * 24 * 7, signed:true })
        // 使用了@Response()后不能使用 return 返回，需要使用res.send()返回
        res.send('ok')
    }
    @Get('cookie')
    cookie(@Req() req) {
        // 获取cookie
        console.log('object :>> ', req.cookies.name);
        // 获取加密cookie
        console.log('object :>> ', req.signedCookies.age);
        return {
            name: req.cookies.name,   
            age: req.signedCookies.age  
        }
    }
}
```

## 六、session（保存在服务器中）
>
>当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，生成一个类似于key,value的键值对，然后将key（cookie）返回到浏览器（客户）端，浏览器下次再访问时，携带key（cookie），找到对应的session（value)。客户的信息都保存在session中。
>
### 安装express-session

```typescript
npm i express-session
```

### 在main.ts导入

```typescript
// 引入express-session
import * as session from 'express-session'

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
```

### 使用session

```typescript
import { Controller, Get, Req, Response, } from '@nestjs/common';

@Controller('study3')
export class Study3Controller {
    @Get('setSession')
    setSession(@Req() req):string {
        // 设置session
        req.session.name = '张三'
        return '设置session'
    }
    @Get('getSession')
    getSession(@Req() req):string {
        // 获取session
        return '获取session：' + req.session.name 
    }
}
```

## 七、文件上传

```typescript
// 先引入UploadedFile，UseInterceptors，FileInterceptor，FilesInterceptor，FileFieldsInterceptor 
import { Body, Controller, Get, Post, Render, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor, FileInterceptor,FileFieldsInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';


@Controller('study4')
export class Study4Controller {
    @Get()
    // http://localhost:3000/study4 默认显示study.ejs页面
    @Render('study.ejs')
    index() {
    }

    // 单个文件上传
    @Post('doAdd')
    @UseInterceptors(FileInterceptor('pic'))
    doAdd(@Body() body, @UploadedFile() file) {
        console.log('body :>> ', body);
        console.log('file :>> ', file);

        // join为拼接字符串
        // createWriteStream 创建可写入流
        var writeStream = createWriteStream(join(__dirname, '../../public/upload/', `${Date.now()}-${file.originalname}`))
        writeStream.write(file.buffer)

        return '上传成功'
    }

    // 多个文件上传
    @Post('doAdds')
    @UseInterceptors(FilesInterceptor('pic'))
    // 文件名不同这样写
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'pic1', maxCount: 1 },   // maxCount 最大文件数量
    //     { name: 'pic2', maxCount: 1 }
    // ]))
    doAdds(@Body() body, @UploadedFiles() files) {
        console.log('file :>> ', files);
        for(const file of files){
            var writeStream = createWriteStream(join(__dirname, '../../public/upload/', `${Date.now()}-${file.originalname}`))
            writeStream.write(file.buffer)
        }
        return '上传成功'
    }
}
```

## 八、中间件
>
> 中间件是在路由处理程序之前调用的函数。中间件函数可以访问 request 和 response 对象，以及应用请求-响应周期中的 next() 中间件函数。
>
### 创建中间件

```typescript
nest g middleware 中间件名称

// 创建后文件代码
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class Study5Middleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('中间件输出日期 :>> ', Date());
    next();
  }
}
```

### 使用中间件

```typescript
// 在app.module.ts 中配置
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
```

### 全局中间件
>
> 如果我们想一次将中间件绑定到每个已注册的路由，我们可以使用 INestApplication 实例提供的 use() 方法，但是只能使用函数中间件。

```typescript
// 在main.ts中配置
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

## 九、管道
>
> 转型：将输入数据转换为所需的形式（例如，从字符串到整数）  
> 验证：评估输入数据，如果有效，只需将其原样传递；否则抛出异常

### 创建管道

```typescript
nest g pipe 管道名称

// 生成的管道文件代码
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class Study6Pipe implements PipeTransform {
  // value 就是接口传过来的值
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('我是管道输出 :>> ', value);
    value.id = 100;
    return value;
  }
}
```

### 使用管道

```typescript
import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { Study6Pipe } from './study6.pipe';

@Controller('study6')
export class Study6Controller {
    @Get()
    // 使用管道
    @UsePipes(Study6Pipe)
    index(@Query() info){
        console.log('info :>> ', info);
    }
}
```

## 十、模块

### 创建模块

```typescript
nest g module 模块名

// 生成代码
import { Module } from '@nestjs/common';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],   // 模块导出的服务，其他模块引入当前模块后就可以使用该服务
})
export class Study7Module {}
```

## 十一、守卫
>
> 1.守卫有单一的责任。它们根据运行时存在的某些条件（如权限、角色、ACL 等）确定给定请求是否将由路由处理程序处理。
> 2.守卫在所有中间件之后、任何拦截器或管道之前执行。
>
### 创建守卫

```typescript
nest g guard 守卫名称

// 生成代码

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
```

### 配置守卫

```typescript
// 在控制器文件中
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Study8Guard } from './study8.guard';

@Controller('study8')
// 直接在控制器上配置守卫
@UseGuards(Study8Guard)
export class Study8Controller {
    @Get()
    index(){
        return 'study8'
    }

    @Get('add')
    @UseGuards(Study8Guard) // 可以在方法上配置守卫
    add(){
        return 'study8/add'
    }
}
```

### 全局守卫

```typescript
// 在main.ts中
// 配置全局守卫
app.useGlobalGuards(new Study8Guard())
```

## 十二、mongoose
>
> 使用mongoose连接MongoDB数据库并实现简单的增删改查接口
>
### 安装并引入mongoose，与数据库建立连接

```typescript
// 执行命令
npm i @nestjs/mongoose mongoose

// 在app.module.ts中引入mongoose
import { MongooseModule } from '@nestjs/mongoose';
// 连接数据库
@Module({
  // 与数据库建立连接 MongooseModule.forRoot('数据库地址') 
  imports: [ MongooseModule.forRoot('mongodb://localhost:27017/chat')],
})
```

### 模型注入（创建schema）
>
> 使用 Mongoose，一切都源自 Schema。每个模式都映射到一个 MongoDB 集合并定义该集合中文档的形状。模式用于定义 模块。模型负责从底层 MongoDB 数据库创建和读取文档。

```typescript
// src路径下建立schema文件夹，根据 数据库表名称 创建文件： 表名称.schema.ts
import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    // 里面数据必须和数据库表里面对应
    account: String,
    password: String,
    username: String,
    loginData: String,
    friends:Array,
});
```

### 联系

```typescript
// 在模块文件 xxx.module.ts 中
import { Module } from '@nestjs/common';
import { Study9Service } from './study9.service';
import { Study9Controller } from './study9.controller';
// 配置数据库模型
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/schema/users.schema';
import { ChatsSchema } from 'src/schema/chats.schema';
import { Study99Service } from './study99.service';

@Module({
    imports:[MongooseModule.forFeature([
        {
            // 指定数据库表
            name:'Users',
            schema: UsersSchema,
            collection:'users'  
        },
        {
            name:'Chats',
            schema: ChatsSchema,
            collection:'chats'
        }
    ])],
    providers:[Study9Service,Study99Service],
    controllers: [Study9Controller]
})
export class Study9Module {}
```

### 增删改查接口

#### 定义接口(使传入的数据必须是接口类型的数据)

```typescript
// 比如要定义User类型数据,src目录下新建interface文件夹，创建user.interface.ts文件
// 也可以直接使用 nest g interface interface/user 命令直接生成
export interface Users {
    _id?: String,
    account?: String,
    password?: String,
    username?: String,
    loginData?: String,
    friends?:Array<string>,
}
```

#### 在控制器文件xxx.controller.ts中

```typescript
import { Controller, Get } from '@nestjs/common';
import { Study9Service } from './study9.service';
import { Study99Service } from './study99.service';

@Controller('study9')
export class Study9Controller {
    constructor(private study9Service: Study9Service,private study99Service: Study99Service){}
    // 查
    @Get('findUsersAll')
    findUsersAll(){
        return this.study9Service.findUsersAll({},'account password');
    }
    // 查
    @Get('findChatsAll')
    findChatsAll(){
        return this.study99Service.findChatsAll();
    }
    // 增
    @Get('addUser')
    addUser(){
        return this.study9Service.addUser({
            account: 'test',
            password: '123456'
        });
    }
    // 改
    @Get('updateUser')
    updateUser(){
        return this.study9Service.updateUser({
            _id:'640fe21e0ea33c2ebef9afc9',
        },{
            account: 'luyu',
            password: '123'
        });
    }
    // 删
    @Get('deleteUser')
    deleteUser(){
        return this.study9Service.deleteUser({
            _id:'66bc5d514bec1536ca33a2ef',
        });
    }
}
```

#### 在服务文件 xxx.service.ts中

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// 引入接口
import { Users } from '../interface/users/users.interface'

@Injectable()
export class Study9Service {
    constructor(@InjectModel('Users') private UsersModel){}
    // 查询users数据
        // json:Users表示传入的参数必须是Users接口类型的数据
        // fields:string用来筛选数据
    async findUsersAll(json:Users,fields?:string){
        return await this.UsersModel.find(json,fields).exec()
    }
    // 添加users数据
    async addUser(json:Users){
        let user = new this.UsersModel(json)
        return await user.save(user)
    }
    // 修改users数据
    async updateUser(json1:Users,json2:Users){
        return await this.UsersModel.updateOne(json1,json2).exec()
    }
    // 删除users数据
    async deleteUser(json:Users){
        return await this.UsersModel.deleteOne(json).exec()
    }
}
```
