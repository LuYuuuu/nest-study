import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class Study99Service {
    constructor(@InjectModel('Chats') private ChatsModel){}
    // 查询所有users数据
    async findChatsAll(){
        return await this.ChatsModel.find().exec()
    }
}
