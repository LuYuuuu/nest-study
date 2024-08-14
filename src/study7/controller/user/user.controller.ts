import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    // 通过 http://localhost:3000/user 访问
    @Get('')
    index(){
        return '我是user'
    }
}
