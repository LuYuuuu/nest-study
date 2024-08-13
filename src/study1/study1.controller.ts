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
