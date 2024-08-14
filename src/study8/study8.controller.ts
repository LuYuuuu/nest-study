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
