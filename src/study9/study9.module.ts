import { Module } from '@nestjs/common';
import { Study9Service } from './study9.service';
import { Study9Controller } from './study9.controller';
// 配置数据库模型
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/schema/users.schema';
import { ChatsSchema } from 'src/schema/chats.schema';
import { Study99Service } from './study99.service';

@Module({
    imports:[MongooseModule.forFeature([
        {
            // 指定数据库表
            name:'Users',
            schema: UsersSchema,
            collection:'users'  
        },
        {
            name:'Chats',
            schema: ChatsSchema,
            collection:'chats'
        }
    ])],
    providers:[Study9Service,Study99Service],
    controllers: [Study9Controller]
})
export class Study9Module {}
