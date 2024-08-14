import { Controller, Get } from '@nestjs/common';

@Controller('study5')
export class Study5Controller {
    @Get()
    index(){
        return 'study5';
    }
}
