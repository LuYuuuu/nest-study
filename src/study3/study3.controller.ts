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
