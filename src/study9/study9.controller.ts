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
