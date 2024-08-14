import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// 引入接口
import { Users } from '../interface/users/users.interface'

@Injectable()
export class Study9Service {
    constructor(@InjectModel('Users') private UsersModel){}
    // 查询users数据
        // json:Users表示传入的参数必须是Users接口类型的数据
        // fields:string用来筛选数据
    async findUsersAll(json:Users,fields?:string){
        return await this.UsersModel.find(json,fields).exec()
    }
    // 添加users数据
    async addUser(json:Users){
        let user = new this.UsersModel(json)
        return await user.save(user)
    }
    // 修改users数据
    async updateUser(json1:Users,json2:Users){
        return await this.UsersModel.updateOne(json1,json2).exec()
    }
    // 删除users数据
    async deleteUser(json:Users){
        return await this.UsersModel.deleteOne(json).exec()
    }
}
