import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    // 里面数据必须和数据库表里面对应
    account: String,
    password: String,
    username: String,
    loginData: String,
    friends:Array,
});