import { Module } from '@nestjs/common';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],   // 模块导出的服务，其他模块引入当前模块后就可以使用该服务
})
export class Study7Module {}
