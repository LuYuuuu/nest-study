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
