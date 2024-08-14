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
