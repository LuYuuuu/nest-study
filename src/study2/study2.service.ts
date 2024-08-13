import { Injectable } from '@nestjs/common';

// 通过 nest g service study2 创建服务
// 服务中一般封装 一些公共的功能 和 数据库操作
@Injectable()
export class Study2Service {
    findAll(){
        return [{title:'abc'},{title:'abc'},{title:'abc'}]
    }
}
